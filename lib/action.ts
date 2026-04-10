"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, roomSchema, reserveSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

export const saveRoom = async (image: string, prevState: unknown, formData: FormData) => {
    if (!image) { return { error: "Image is required" }; }

    const rowData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        amenities: formData.getAll("amenities") as string[],
    }

    const validateFields = roomSchema.safeParse(rowData);
    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, };
    }

    const { name, description, capacity, price, amenities } = validateFields.data;
    try {
        await prisma.room.create({
            data: {
                name,
                description,
                capacity,
                price,
                image,
                roomAmenities: {
                    createMany: { data: amenities.map((item) => ({ amenitiesId: item })) }
                }
            },
        });
    } catch (error) {
        console.log(error);
        return { error: "Failed to save room" };
    }
    redirect("/admin/room");
}

export const contactMessage = async (prevState: unknown, formData: FormData) => {
    const validateFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, subject, message } = validateFields.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });
        return { message: "Message sent successfully" };
    } catch (error) {
        console.log(error);
        return { error: "Failed to send message" };
    }
};

// Delete Room
export const deleteRoom = async (id: string, image: string) => {
    try {
        await del(image);
        await prisma.room.delete({ where: { id } });
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/room");
};

// Update Room
export const updateRoom = async (roomId: string, image: string, prevState: unknown, formData: FormData) => {
    if (!image) { return { error: "Image is required" }; }

    const rowData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        capacity: Number(formData.get("capacity")),
        price: Number(formData.get("price")),
        amenities: formData.getAll("amenities") as string[],
    }

    const validateFields = roomSchema.safeParse(rowData);
    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, };
    }

    const { name, description, capacity, price, amenities } = validateFields.data;
    try {
        await prisma.$transaction([
            prisma.room.update({
                where: { id: roomId },
                data: {
                    name,
                    description,
                    capacity,
                    price,
                    image,
                    roomAmenities: {
                        deleteMany: {}
                    }
                },
            }),
            prisma.roomAmenities.createMany({
                data: amenities.map((item) => ({
                    roomId,
                    amenitiesId: item
                }))
            })
        ]);
    } catch (error) {
        console.log(error);
        return { error: "Failed to save room" };
    }
    revalidatePath("/admin/room");
    redirect("/admin/room");
}

export type ReserveState = {
    errors?: {
        name?: string[];
        phone?: string[];
    };
    messageDate?: string;
    message?: string;
};

// Create Reserve
export const createReserve = async (
    roomId: string,
    price: number,
    startDate: Date,
    endDate: Date,
    prevState: unknown,
    formData: FormData
): Promise<ReserveState> => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=room/${roomId}`);
    const userId = session.user.id;

    const rawData = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
    }

    const validateFields = reserveSchema.safeParse(rawData);
    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, };
    }

    const { name, phone } = validateFields.data;

    const totalDays = differenceInCalendarDays(endDate, startDate);
    if (totalDays <= 0) {
        return { messageDate: "End date must be after start date" };
    }

    const totalPrice = price * totalDays;

    let reservationId;
    
    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: {
                    name,
                    phone,
                },
            });

            const reservation = await tx.reservation.create({
                data: {
                    roomId: roomId,
                    price: price,
                    startDate: startDate,
                    endDate: endDate,
                    userId: userId,
                    payment:{
                        create:{
                            amount: totalPrice,
                            method: "Pending",
                        }
                    }
                },
            });
            reservationId = reservation.id;
        })
    } catch (error) {
        console.log(error);
        return { message: "Failed to reserve room" };
    }
    revalidatePath("/room");
    redirect(`/checkout/${reservationId}`);
};
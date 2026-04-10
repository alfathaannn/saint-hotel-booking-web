import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getAmenities = async () => {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.amenities.findMany();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getRooms = async () => {
    try {
        const result = await prisma.room.findMany({ orderBy: { createdAt: "desc" } });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getRoomsById = async (roomId: string) => {
    try {
        const result = await prisma.room.findUnique({
            where: { id: roomId },
            include: {
                roomAmenities: {
                    select: { Amenities: true }
                }
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getRoomsDetailById = async (roomId: string) => {
    try {
        const result = await prisma.room.findUnique({
            where: { id: roomId },
            include: {
                roomAmenities: {
                    include: {
                        Amenities: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getReservationById = async (id: string) => {
    try {
        const result = await prisma.reservation.findUnique({
            where: { id },
            include: {
                Room: {
                    select: {
                        name: true,
                        image: true,
                        price: true,
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getDisabledRoomsById = async (roomId: string) => {
    try {
        const result = await prisma.reservation.findMany({
            where: {
                roomId: roomId,
                payment: {
                    status: { not: "failure" },
                }
            },
            select: {
                startDate: true,
                endDate: true,
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getReservationByUserId = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.reservation.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                Room: {
                    select: {
                        name: true,
                        image: true,
                        price: true,
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getRevenueAndReservation = async () => {
    try {
        const revenueResult = await prisma.payment.aggregate({
            where: {
                status: { not: "failure" },
            },
            _sum: {
                amount: true,
            }
        });
        
        const reserveResult = await prisma.reservation.count({
            where: {
                payment: {
                    status: { not: "failure" },
                }
            }
        });

        return {
            revenue: revenueResult._sum.amount || 0,
            reserve: reserveResult,
        };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getTotalCustomers = async () => {
    try {
        const result = await prisma.reservation.findMany({
            where: {
                payment: {
                    status: { not: "failure" },
                }
            },
            distinct: ["userId"],
            select: {
                userId: true,
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
}

export const getAllReservations = async () => {
    try {
        const result = await prisma.reservation.findMany({
            include: {
                Room: {
                    select: {
                        name: true,
                        image: true,
                        price: true,
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch all reservations");
    }
}
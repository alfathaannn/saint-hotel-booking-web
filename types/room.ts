import { Prisma } from "@/app/generated/prisma/client";

export type RoomProps = Prisma.RoomGetPayload<{
    include: {
        roomAmenities: {
            select: { Amenities: true }
        }
    }
}>

export type RoomDetailProps = Prisma.RoomGetPayload<{
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
}>;

export type DisabledDateProps = Prisma.ReservationGetPayload<{
    select: {
        startDate: true,
        endDate: true,
    }
}>
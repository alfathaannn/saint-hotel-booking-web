import { Prisma } from "@/app/generated/prisma/client";

export type reservationProps = Prisma.ReservationGetPayload<{
    include: {
        Room: {
            select: {
                name: true;
                price: true;
                image: true;
            }
        };
        User: {
            select: {
                name: true;
                email: true;
                phone: true;
            }
        };
        payment: true;
    }
}>
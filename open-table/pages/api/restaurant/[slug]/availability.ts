import { NextApiRequest, NextApiResponse } from "next";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";
import { PrismaClient } from "@/prisma/generated/prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { slug, day, time, partySize } = req.query as {
            slug: string;
            day: string;
            time: string;
            partySize: string;
        };

        if (!day || !time || !partySize) {
            return res.status(400).json({
                errorMessage: "Invalid data provided",
            });
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug,
            },
            select: {
                tables: true,
                open_time: true,
                close_time: true,
            },
        });

        if (!restaurant) {
            return res.status(400).json({
                errorMessage: "Invalid data provided",
            });
        }

        const searchTimesWithTables = await findAvailableTables({
            day,
            time,
            res,
            restaurant,
        });

        if (!searchTimesWithTables) {
            return res.status(400).json({
                errorMessage: "Invalid data provided",
            });
        }

        const availabilities = searchTimesWithTables
            .map((t) => {
                const sumSeats = t.tables.reduce((sum, table) => {
                    return sum + table.seats;
                }, 0);

                return {
                    time: t.time,
                    available: sumSeats >= parseInt(partySize),
                };
            })
            .filter((availability) => {
                const timeIsAfterOpeningHour =
                    new Date(`${day}T${availability.time}`) >=
                    new Date(`${day}T${restaurant.open_time}`);
                const timeIsBeforeClosingHour =
                    new Date(`${day}T${availability.time}`) <=
                    new Date(`${day}T${restaurant.close_time}`);

                return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
            });

        return res.json(availabilities);
    }
}
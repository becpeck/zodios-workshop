
import express, { type Request, type Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import db from "../db";

const router = express.Router();

const newWorkoutSchema = z.object({
    username: z.string(),
    type: z.string(),
    duration: z.number().int().positive(),
    notes: z.string().optional(),
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const workouts = await db.workout.findMany();
        console.log(workouts)
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unknown error"});
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const parsed = newWorkoutSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.errors[0].message });
        } else {
            const { data } = parsed;
            const workout = await db.workout.create({
                data,
            });
            res.status(201).json(workout);
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message: "Prisma Error"});
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
});

export default router;

import express, { type Request, type Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import db from "../db";

const router = express.Router();

// EXAMPLE [1.ii.a] - Zod schema that describes incoming request body
const NewWorkoutSchema = z.object({
    username: z.string(),
    type: z.string(),
    duration: z.number().int().positive(),
    notes: z.string().optional(),
});

// EXAMPLE [1.ii.a] - Inferred type from zod schema - Hover Me!
type CreateWorkoutBody = z.infer<typeof NewWorkoutSchema>;

router.get("/", async (req: Request, res: Response) => {
    try {
        const workouts = await db.workout.findMany();
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unknown error"});
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        // EXAMPLE [1.ii.b] - Validating incoming request body
        // Using .safeParse here instead of .parse because we want to handle zod errors separately--
        // .parse throws an error on mismatch that would skip to the catch block, where err loses type info
        const parsed = NewWorkoutSchema.safeParse(req.body);
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
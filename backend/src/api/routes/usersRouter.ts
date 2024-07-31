
import express, { type Request, type Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import db from "../db";

const router = express.Router();

// EXAMPLE [1.ii.a]: Zod schema with refinements and custom messages
const newUserSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    email: z.string().email().min(1, "Email cannot be empty"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter"})
        .refine((val) => /[a-z]/.test(val), { message: "Password must contain a lowercase letter"})
        .refine((val) => /[0-9]/.test(val), { message: "Password must contain a number"})
        .refine((val) => /[!@#\$%\^&*\(\)]/.test(val), { message: "Password must contain one special character: !@#$%^&*()"}),
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const parsed = newUserSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.errors[0].message });
        } else {
            const { data } = parsed;
            const user = await db.user.create({
                data,
                select: {
                    id: true,
                    email: true,
                    username: true,
                    createdAt: true,
                },
            });
            res.status(201).json(user);
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            res.status(400).json({ message: "Email already has an account or username already in use"});
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
});

export default router;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function users() {
    await prisma.user.createMany({
        data: [
            {
                username: "test",
                password: "password",
                email: "test@test.com",
            },
            {
                username: "alice123",
                password: "Alice123!",
                email: "alice@alice.com",
            },
            {
                username: "pizzabob",
                password: "Pizza432!",
                email: "bob@bob.com",
            },
        ],
    });
}

async function workoutTypes() {
    await prisma.workoutType.createMany({
        data: [
            { type: "run" },
            { type: "bike" },
            { type: "swim" },
        ],
    });
}

async function workouts() {
    await prisma.workout.createMany({
        data: [
            { username: "test", type: "run", duration: 34 },
            { username: "pizzabob", type: "swim", duration: 27 },
            { username: "alice123", type: "bike", duration: 42 },
        ],
    });
}

async function main() {
    await users();
    await workoutTypes();
    await workouts();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    }).catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });
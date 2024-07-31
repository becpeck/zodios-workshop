import { makeEndpoint, makeErrors, parametersBuilder, apiBuilder } from "@zodios/core";
import { z } from "zod";

// EXAMPLE [2.ii.a.a] - getWorkouts
const getWorkouts = makeEndpoint({
    method: "get",
    path: "/api/workouts",
    alias: "getWorkouts",
    response: z.array(z.object({
        id: z.number(),
        username: z.string(),
        type: z.string(),
        duration: z.number(),
        // notes: z.string().or(z.null())
        notes: z.string().nullable(),
        loggedAt: z.string(),
    })),
})

// EXAMPLE [2.ii.a.b] - createWorkout

// Build and export our workoutsApi

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
        // notes: z.string().or(z.null())  // alternative to below
        notes: z.string().nullable(),
        loggedAt: z.string().transform((str) => new Date(str)),
    })),
    errors: makeErrors([{
        status: 400,
        schema: z.object({
            message: z.string(),
        }),
    }]),
})

// EXAMPLE [2.ii.a.b] - createWorkout

// Build and export our workoutsApi
const workoutsApi = apiBuilder()
    .addEndpoint(getWorkouts)
    .build();

export default workoutsApi;

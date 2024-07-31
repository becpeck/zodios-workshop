import { makeEndpoint, makeErrors, parametersBuilder, apiBuilder } from "@zodios/core";
import { z } from "zod";

// EXAMPLE [2.ii.a.a] - getWorkouts
const getWorkouts = makeEndpoint({
    method: "get",
    path: "",
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
const createWorkout = makeEndpoint({
    method: "post",
    path: "",
    alias: "createWorkout",
    parameters: parametersBuilder()
        .addBody(z.object({
            username: z.string(),
            duration: z.number(),
            type: z.string(),
            notes: z.string().optional(),
        }))
        .build(),
    response: z.object({
        id: z.number(),
        username: z.string(),
        type: z.string(),
        duration: z.number(),
        notes: z.string().nullable(),
        loggedAt: z.string().transform((str) => new Date(str)),
    }),
    errors: makeErrors([{
        status: 400,
        schema: z.object({
            message: z.string(),
        }),
    }]),
})

// Build and export our workoutsApi
const workoutsApi = apiBuilder()
    .addEndpoint(getWorkouts)
    .addEndpoint(createWorkout)
    .build();

export default workoutsApi;

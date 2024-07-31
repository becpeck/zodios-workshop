import { makeEndpoint, apiBuilder, parametersBuilder, makeErrors, ZodiosEndpointError } from "@zodios/core";
import { z } from "zod";

// You can define multiple errors and compose them in makeErrors
const Error400Response: ZodiosEndpointError = {
    status: 400,
    schema: z.object({
        message: z.string(),
    }),
}
const genericError: ZodiosEndpointError = {
    status: "default",
    schema: z.object({
        message: z.string(),
    }),
}

// EXAMPLE [2.ii.a.c] - createUser
const createUser = makeEndpoint({
    method: "post",
    path: "",
    alias: "createUser",
    parameters: parametersBuilder()
        .addBody(z.object({
            username: z.string(),
            password: z.string(),
            email: z.string(),
        }))
        .build(),
    response: z.object({
        id: z.number(),
        username: z.string(),
        email: z.string(),
    }),
    errors: makeErrors([Error400Response, genericError]),
});

const usersApi = apiBuilder()
    .addEndpoint(createUser)
    .build();

export default usersApi;

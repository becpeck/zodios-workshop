import { type ZodiosPlugin } from "@zodios/core";

// EXAMPLE [2.iv.b] - write our own logger plugin
const loggerPlugin: ZodiosPlugin = {
    name: "loggerPlugin",
    request: (async (api, config) => {
        console.log(config);
        return config;
    }),
    response: (async (api, config, response) => {
        console.log(response);
        return response;
    }),
    error: (async (api, config, error) => {
        console.error(error);
        throw error;
    }),
}

export default loggerPlugin;
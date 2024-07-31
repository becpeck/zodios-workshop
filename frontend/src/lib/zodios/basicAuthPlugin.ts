import { type ZodiosPlugin } from "@zodios/core";

const basicAuthorizationPlugin: ZodiosPlugin = {
  name: "basicAuthorization",
  request: async (api, config) => {
    return {
      ...config,
      auth: {
        username: `env.AUTH_SPOTIFY_ID`,
        password: `env.AUTH_SPOTIFY_SECRET`,
      },
    };
  },
};

export default basicAuthorizationPlugin;

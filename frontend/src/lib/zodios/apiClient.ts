import { mergeApis, Zodios } from "@zodios/core";
import workoutsApi from "./routes/workoutsApi";
import { pluginToken } from "@zodios/plugins";
import loggerPlugin from "./loggerPlugin";
import usersApi from "./routes/usersApi";

const API_BASE_URL = "http://localhost:1234/api";

// EXAMPLE [2.ii.b] - Zodios api and client

// Use apiBuilder or mergeApis to create our apiDefs definition
// TIP: mergeApis lets you split apart by pathnames, good for very large apis
const api = mergeApis({
    "/workouts": workoutsApi,
    "/users": usersApi,
});

// Create our zodios instance - apiClient
const apiClient = new Zodios(API_BASE_URL, api);

// Add plugins
apiClient.use(loggerPlugin);
// This plugin attaches bearer token headers to every endpoint
apiClient.use(pluginToken({
    getToken: async () => "token",
}));

// Export the apiClient
export default apiClient;
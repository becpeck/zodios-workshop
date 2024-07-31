import { Zodios, mergeApis } from "@zodios/core";
import loggerPlugin from "./loggerPlugin";
import usersApi from "./routes/usersApi";
import workoutsApi from "./routes/workoutsApi";

const API_BASE_URL = "http://localhost:1234/api";

// EXAMPLE [2.ii.b] - Zodios api and client

// Use apiBuilder or mergeApis to create our apiDefs definition
// TIP: mergeApis lets you split apart by pathnames, good for very large apis
export const api = mergeApis({
    "/users": usersApi,
    "/workouts": workoutsApi,
});

// Create our zodios instance - apiClient
const apiClient = new Zodios(API_BASE_URL, api);

// Add any plugins
apiClient.use(loggerPlugin);

export default apiClient;

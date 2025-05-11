import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

// List of endpoints that don't require Authorization
const noAuthEndpoints = ["/login", "/register", "/public"]; // Add any other public endpoints here

axiosInstance.interceptors.request.use(
    (config) => {
        // Skip Authorization header for no-auth endpoints
        const isNoAuthEndpoint = noAuthEndpoints.some((endpoint) =>
            config.url.includes(endpoint)
        );

        if (!isNoAuthEndpoint) {
            const token = localStorage.getItem("jwt");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
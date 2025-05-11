import axiosInstance from "./axios";

// ⚙️ Hàm gọi API chung
async function callApi(endpoint, method = "GET", body = null, params = {}) {
    const token = localStorage.getItem("authToken");
    const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";

    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const config = {
        method,
        url,
        headers: {
            ...(body instanceof FormData
                ? { "Content-Type": "multipart/form-data" }
                : { "Content-Type": "application/json" }),
            ...(isLoggedOut ? {} : { "Authorization": token ? `Bearer ${token}` : undefined }),
        },
        data: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    };

    try {
        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}

// 🛒 Product API
export async function GET_PRODUCTS_BY_CATEGORY(categoryId, params = {}) {
    return await callApi(`categories/${categoryId}/products`, "GET", null, params);
}

// 📦 Generic GET (all)
export async function GET_ALL(endpoint, params = {}) {
    return await callApi(endpoint, "GET", null, params);
}

// 🔍 GET by ID
export async function GET_ID(endpoint, id) {
    return await callApi(`${endpoint}/${id}`, "GET");
}

// ➕ POST (add)
export async function POST_ADD(endpoint, data) {
    return await callApi(endpoint, "POST", data);
}

// ✏️ PUT (edit)
export async function PUT_EDIT(endpoint, id, data) {
    return await callApi(`${endpoint}/${id}`, "PUT", data);
}

// ❌ DELETE
export async function DELETE_ID(endpoint, id) {
    return await callApi(`${endpoint}/${id}`, "DELETE");
}

// 🔐 LOGIN
export async function LOGIN(body) {
    try {
        const response = await axiosInstance.post("/login", body, {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        });

        const token = response.data.token;
        if (token) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("isLoggedOut", "false");
        }

        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

// 📝 REGISTER
export async function REGISTER(body) {
    try {
        const response = await axiosInstance.post("/register", body, {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

// 🚪 LOGOUT
export async function LOGOUT() {
    localStorage.setItem("isLoggedOut", "true");
    localStorage.removeItem("authToken");
    return { success: true };
}
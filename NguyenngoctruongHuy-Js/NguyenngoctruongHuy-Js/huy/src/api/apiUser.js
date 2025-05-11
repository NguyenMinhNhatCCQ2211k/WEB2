import { LOGIN, REGISTER, LOGOUT, GET_ALL } from "./apiUtils"; // Import from the new utility file

const apiUser = {
    createUser: (data) => {
        return REGISTER(data);
    },

    loginUser: (data) => {
        return LOGIN(data);
    },

    logoutUser: () => {
        return LOGOUT();
    },

    getAll: () => {
        return GET_ALL("/users");
    },
};

export default apiUser;
import { GET_ALL, GET_ID, POST_ADD, PUT_EDIT, DELETE_ID } from "./apiUtils";

const apiProduct = {
    getAll: () => {
        return GET_ALL("/public/products");
    },

    getNewest: async () => {
        const products = await GET_ALL("/public/products");
        const sorted = products.sort((a, b) => new Date(b.id) - new Date(a.id));
        return sorted.slice(0, 6);
    },

    getPromotion: async () => {
        const products = await GET_ALL("/public/products");
        return products.filter((p) => p.is_on_sale === true).slice(0, 3);
    },

    getDetailProductById: (id) => {
        return GET_ID("/public/products", id);
    },

    getProductByCatId: (categoryId) => {
        return GET_ALL(`/public/products/category/${categoryId}`);
    },

    createProduct: (formData) => {
        return POST_ADD("/admin/products", formData);
    },

    editProduct: (id, formData) => {
        return PUT_EDIT(`/admin/products/${id}`, formData);
    },

    delProductById: (id) => {
        return DELETE_ID("/admin/products", id);
    },
};

export default apiProduct;
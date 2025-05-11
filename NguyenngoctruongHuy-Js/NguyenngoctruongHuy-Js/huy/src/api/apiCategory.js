import axiosInstance from "./axios";

const apiCategory = {
  // GET: /api/public/categories
  getAll: () => {
    return axiosInstance.get("/public/categories").then((res) => res.data);
  },

  // POST: /api/admin/categories
  createCategory: (category) => {
    const formData = new FormData();
    formData.append("Name", category.Name);
    formData.append("ImageFile", category.ImageFile);

    return axiosInstance.post("/admin/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);
  },

  // GET: /api/public/categories/{categoryId}
  getCategoryById: (id) => {
    return axiosInstance.get(`/public/categories/${id}`).then((res) => res.data);
  },

  // PUT: /api/admin/categories/{categoryId}
  editCategory: (id, category) => {
    const formData = new FormData();
    formData.append("Name", category.Name);
    if (category.ImageFile) {
      formData.append("ImageFile", category.ImageFile);
    }

    return axiosInstance.put(`/admin/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);
  },

  // DELETE: /api/admin/categories/{categoryId}
  delCategoryById: (id) => {
    return axiosInstance.delete(`/admin/categories/${id}`).then((res) => res.data);
  },
};

export default apiCategory;

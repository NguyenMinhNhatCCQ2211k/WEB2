import axiosInstance from "./axios";

 
const apiBrand = {
  getAll: () => {
    return axiosInstance.get("/brands").then((res) => res.data);
  },
  getDetailProductBySlug: (slug) => {
    return axiosInstance
      .get(`/brands?filters[slug][$eq]=${slug}&populate=*`)
      .then((res) => res.data);
  },
  createBrand: (brand) => {
    return axiosInstance.post("/brands", brand);
  },
  getBrandById: (id) => {
    return axiosInstance.get(`/brands/${id}`);
  },
  editBrand: (id, brand) => {
    return axiosInstance.put(`/brands/${id}`, brand);
  },
  delBrandById: (id) => {
    return axiosInstance.delete(`/brands/${id}`);
  },
};
export default apiBrand;
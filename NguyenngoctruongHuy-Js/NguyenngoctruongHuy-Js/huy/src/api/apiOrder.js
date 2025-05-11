import axiosInstance from "./axios";

const apiOrder = {
    createOrder: (data) => {
      return axiosInstance.post("/orders", data);
    },
    createOrderDetail: (data) => {
      return axiosInstance.post("/orderds", data);
    },

    
    getNewest: () => {
      return axiosInstance
        .get("/orders?sort[0]=createdAt:desc&pagination[limit]=1")
        .then((res) => res.data);
    },
    getAll: () => {
      return axiosInstance.get("/orders").then((res) => res.data);
    },
    getDetailOrderById: (id) => {
      return axiosInstance.get(`/orders/${id}`).then((res) => res.data);
    },
    getListDetailOrderById: (id) => {
      return axiosInstance
        .get(`/order-details?filters[order_id][$eq]=${id}&populate=*`)
        .then((res) => res.data);
    },
    editOrder: (id, order) => {
      return axiosInstance.put(`/orders/${id}`, order);
    },
  };
  export default apiOrder;
import axiosInterceptorInstance from "../../axiosInterceptorInstance";

export const getCustomers = async () => {
    const response = await axiosInterceptorInstance.get('/customer');
    return response.data;
}

'use server'
import axiosInterceptorInstance from "../../axiosInterceptorInstance";

export interface Product {
    id: number,
    name: string,
    created_at: string,
    company: string,
    tags: 'string'
}

export interface Customer {
    id: number,
    interested_products: Product[],
    name: string,
    point_of_contact: string,
    email: string,
    user: number

}
export const getCustomers: () => Promise<Customer[]> = async () => {
    const response = await axiosInterceptorInstance.get('/customer');
    return response.data;
}

export const createCustomer: () => Promise<Customer> = async (customer) => {
    const response = await axiosInterceptorInstance.post('/customer/', customer);
    return response.data;
}

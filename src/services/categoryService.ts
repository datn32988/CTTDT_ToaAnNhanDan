

import axiosClient from "../api/axiosClient";
import  type {CategoryResponse} from "../types/category.type"

export const getCategoriesApi = async (): Promise<CategoryResponse[]> => {
    const response = await axiosClient.get("/Post/categories");
    return response.data;
};




import axiosClient from "../api/axiosClient";
import  type {CategoryResponse} from "../types/category.type"

export const getCategoriesApi = async (parentId : number): Promise<CategoryResponse[]> => {
    const response = await axiosClient.get("/Post/categories",{
        params: {parentId}
    });
    return response.data;
};


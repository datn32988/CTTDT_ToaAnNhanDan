
import axiosClient from "../api/axiosClient";
import type { Post, PostListItem, PostListResponse, PostResponse } from "../types/Post.type";



export const postService = {

    getPosts: async (categoryId: number, page: number = 1): Promise<PostResponse> => {
        const response = await axiosClient.get<PostResponse>("/Post", {
            params: { categoryId, page }
        });
        return response.data;
    },

    getPostDetail: async (id: number): Promise<Post> => {
        const response = await axiosClient.get<Post>(`/Post/${id}`);
        return response.data;
    },

  createPost: async (data:any): Promise<any> => {
    const response = await axiosClient.post("/Post", data );
    return response.data;

   
},
    getPostsByCategory: async (categoryId: number, page: number): Promise<PostListResponse> => {
        const response = await axiosClient.get<PostListResponse>(
            `/Post/by-category/${categoryId}?page=${page}`
        );
        return response.data;
    },
    getPostByRootCategory: async (rootCategoryId : number, page: number): Promise<PostListResponse> =>{
        const response = await axiosClient.get<PostListResponse>(
            `/Post/by-root-category/${rootCategoryId}?page=${page}`
        );
        return response.data;
    }
};
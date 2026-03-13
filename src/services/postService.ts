
import axiosClient from "../api/axiosClient";
import type { Post, PostResponse } from "../types/Post.type";



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

  createPost: async (formData: FormData): Promise<any> => {
    const response = await axiosClient.post("/Post", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}
};
import axiosClient from "../api/axiosClient";

export const commentService = {

    getCommentByPostId: async (postId: number) =>{
        const res = await axiosClient.get(`/Post/${postId}/comment`)
        return res.data;
    },

    createComment: async (postId: number, data: {content: string, authorName: string}) => {
        const res = await axiosClient.post(`/Post/${postId}/comments`,data);
        return res.data
    }

};
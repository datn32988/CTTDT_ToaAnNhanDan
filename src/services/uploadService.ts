import axiosClient from "../api/axiosClient";

const uploadService = {
    uploadPostMedia: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('File', file); 

        const response = await axiosClient.post("/upload/post-media", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
};

export default uploadService; // Xuất mặc định
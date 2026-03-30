const BASE_URL = "https://localhost:7212";

// Helper lấy ảnh
export const getThumbnail = (url: string | null | undefined) => {
    if (!url) return "/fallback.jpg";
    // Nếu url là file mp4, thường server sẽ không tự tạo thumb, 
    // bạn có thể để ảnh mặc định hoặc nếu server có logic khác thì thay vào.
    if (url.endsWith(".mp4")) return "/video-default-thumb.jpg"; 

    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BASE_URL}${cleanUrl}`;
};

// Helper lấy video
export const getVideo = (url: string | null | undefined, type: number) => {
    if (!url || type !== 2) return null; // Chỉ lấy nếu type là 2 (Video)

    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BASE_URL}${cleanUrl}`;
};

export const getMediaUrl = (url: string | null | undefined) => {
    if (!url) return null;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BASE_URL}${cleanUrl}`;
};
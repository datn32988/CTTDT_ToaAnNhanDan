import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";
import uploadService from "../../services/uploadService";
import { getAccessToken } from "../../utils/auth";

import type { CategoryResponse } from "../../types/category.type";

interface CreatePostInput {
    categoryId: number;
    title: string;
    content: string;
    createdAt: string;
    media: {
        url: string;
        mediaType: number;
        orderIndex: number;
        isThumbnail: boolean;
    }[];
}

function CreatePostImageNewPage() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        idCategory: "",
        title: "",
        content: "",
    });

    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Load danh mục khi component mount
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategoriesApi(3);
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, idCategory: data[0].id.toString() }));
                }
            } catch (error) {
                console.error("Lỗi tải danh mục:", error);
            }
        };
        loadCategories();
    }, []);

    // Xử lý chọn ảnh
    const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const files = Array.from(e.target.files);
        // Lưu file gốc để upload
        setImages(prev => [...prev, ...files]);

        // Tạo URL preview
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    // Xóa ảnh đã chọn
    const removeImage = (index: number) => {
        // Giải phóng bộ nhớ của URL preview để tránh leak memory
        URL.revokeObjectURL(previewUrls[index]);

        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validate dữ liệu
        const token = getAccessToken();
        if (!token) return alert("Hết phiên đăng nhập!");
        if (!formData.idCategory) return alert("Vui lòng chọn danh mục!");
        if (!formData.title.trim()) return alert("Vui lòng nhập tiêu đề!");
        if (images.length === 0) return alert("Phải có ít nhất 1 ảnh!");

        setLoading(true);

        try {
            // 2. Upload TẤT CẢ ảnh cùng một lúc (Parallel)
            // Promise.all đảm bảo mediaPayload sẽ chứa đầy đủ kết quả của tất cả ảnh
            const mediaPayload = await Promise.all(
                images.map(async (file, index) => {
                    const uploadRes = await uploadService.uploadPostMedia(file);
                    return {
                        url: uploadRes.url, // Đảm bảo backend trả về { url: "..." }
                        mediaType: 1, // 1 là Image
                        orderIndex: index,
                        isThumbnail: index === 0 // Ảnh đầu tiên mặc định là Thumbnail
                    };
                })
            );

            // 3. Chuẩn bị dữ liệu cuối cùng
            const finalPostData: CreatePostInput = {
                categoryId: Number(formData.idCategory),
                title: formData.title,
                content: formData.content,
                createdAt: new Date().toISOString(),
                media: mediaPayload
            };

            // Log ra console để bạn kiểm tra trước khi API được gọi
            console.log("Dữ liệu gửi đi:", finalPostData);

            // 4. Gọi API tạo bài viết
            const result = await postService.createPost(finalPostData);

            alert("Đăng bài thành công!");
            navigate(`/`); // Chuyển hướng về trang chủ hoặc trang chi tiết

        } catch (error) {
            console.error("Lỗi đăng bài:", error);
            alert("Có lỗi xảy ra trong quá trình upload hoặc đăng bài!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl">
                    <h1 className="text-2xl font-bold mb-6 text-red-600 uppercase tracking-wider">
                        Đăng bài viết mới (Nhiều ảnh)
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* DANH MỤC */}
                        <div>
                            <label className="font-bold text-gray-700">Danh mục</label>
                            <select
                                className="w-full border-2 border-gray-200 p-3 rounded-lg mt-2 focus:border-red-500 outline-none transition-all"
                                value={formData.idCategory}
                                onChange={(e) => setFormData({ ...formData, idCategory: e.target.value })}
                            >
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* TIÊU ĐỀ */}
                        <div>
                            <label className="font-bold text-gray-700">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề..."
                                className="w-full border-2 border-gray-200 p-3 rounded-lg mt-2 focus:border-red-500 outline-none transition-all"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        {/* NỘI DUNG */}
                        <div>
                            <label className="font-bold text-gray-700">Nội dung chi tiết</label>
                            <textarea
                                placeholder="Viết nội dung tại đây..."
                                className="w-full border-2 border-gray-200 p-3 rounded-lg mt-2 h-40 focus:border-red-500 outline-none transition-all"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>

                        {/* CHỌN FILE */}
                        <div>
                            <label className="font-bold text-gray-700 block">Hình ảnh minh họa</label>
                            <p className="text-sm text-gray-500 mb-2 italic">Lưu ý: Ảnh đầu tiên sẽ tự động chọn làm ảnh bìa (Thumbnail).</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleSelectImages}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                            />
                        </div>

                        {/* DANH SÁCH PREVIEW */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group border-2 border-white rounded-lg overflow-hidden shadow-md">
                                        <img src={url} alt="preview" className="w-full h-32 object-cover" />
                                        
                                        {index === 0 && (
                                            <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] px-2 py-1 uppercase font-bold">
                                                Thumbnail
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* NÚT THAO TÁC */}
                        <div className="flex gap-4 pt-4 border-t">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${
                                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 shadow-lg"
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                                        ĐANG XỬ LÝ...
                                    </span>
                                ) : "XÁC NHẬN ĐĂNG BÀI"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
                            >
                                HỦY BỎ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default CreatePostImageNewPage;
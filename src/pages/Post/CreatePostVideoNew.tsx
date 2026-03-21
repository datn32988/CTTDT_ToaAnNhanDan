import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CategoryResponse } from "../../types/category.type";
import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";
import uploadService from "../../services/uploadService";
import { getAccessToken } from "../../utils/auth";
import AdminLayout from "../../layouts/AdminLayout";

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

function CreatePostVideoNew() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);

    // State cho Video
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string>("");

    // State cho Thumbnail (Ảnh bìa)
    const [thumbFile, setThumbFile] = useState<File | null>(null);
    const [thumbPreview, setThumbPreview] = useState<string>("");

    const [formData, setFormData] = useState({
        idCategory: "",
        title: "",
        description: ""
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategoriesApi(4); // Chuyên mục video
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, idCategory: data[0].id.toString() }));
                }
            } catch (error) {
                console.error("Lỗi danh mục:", error);
            }
        };
        loadCategories();
    }, []);

    // Xử lý chọn Video
    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    // Xử lý chọn Ảnh bìa
    const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbFile(file);
            setThumbPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAccessToken();
        if (!token) return alert("Hết phiên đăng nhập!");
        if (!videoFile) return alert("Vui lòng chọn file video!");
        if (!thumbFile) return alert("Vui lòng chọn ảnh làm Thumbnail!");

        setLoading(true);

        try {
            // 1. Upload song song cả Video và Ảnh bìa để tiết kiệm thời gian
            const [videoRes, thumbRes] = await Promise.all([
                uploadService.uploadPostMedia(videoFile),
                uploadService.uploadPostMedia(thumbFile)
            ]);

            // 2. Tạo mediaPayload: Ảnh bìa (isThumbnail: true) và Video (mediaType: 2)
            const mediaPayload = [
                {
                    url: thumbRes.url,
                    mediaType: 1, // Ảnh
                    orderIndex: 0,
                    isThumbnail: true
                },
                {
                    url: videoRes.url,
                    mediaType: 2, // Video
                    orderIndex: 1,
                    isThumbnail: false
                }
            ];

            const finalPostData: CreatePostInput = {
                categoryId: Number(formData.idCategory),
                title: formData.title,
                content: formData.description,
                createdAt: new Date().toISOString(),
                media: mediaPayload
            };

            await postService.createPost(finalPostData);
            alert("Đăng tin video thành công!");
            navigate(`/`);
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi upload hoặc đăng bài.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl">
                    <h1 className="text-2xl font-bold mb-8 text-red-700 border-b pb-4 uppercase">
                        Đăng Tin Video & Chọn Ảnh Bìa
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-bold mb-2 text-gray-700">Chuyên mục</label>
                                <select
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-red-500"
                                    value={formData.idCategory}
                                    onChange={(e) => setFormData({ ...formData, idCategory: e.target.value })}
                                >
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold mb-2 text-gray-700">Tiêu đề Video</label>
                                <input
                                    type="text" required
                                    className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-red-500"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* PHẦN CHỌN VIDEO */}
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
                                <label className="block font-bold mb-2 text-red-600">1. Tải Video lên</label>
                                <input type="file" accept="video/*" onChange={handleVideoChange} className="mb-4 text-sm w-full" />
                                {videoPreview && (
                                    <video src={videoPreview} controls className="w-full h-40 bg-black rounded-lg shadow-md" />
                                )}
                            </div>

                            {/* PHẦN CHỌN THUMBNAIL */}
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
                                <label className="block font-bold mb-2 text-blue-600">2. Chọn Ảnh bìa (Thumbnail)</label>
                                <input type="file" accept="image/*" onChange={handleThumbChange} className="mb-4 text-sm w-full" />
                                {thumbPreview && (
                                    <div className="relative">
                                        <img src={thumbPreview} alt="thumb" className="w-full h-40 object-cover rounded-lg shadow-md" />
                                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">Thumbnail</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold mb-2 text-gray-700">Mô tả nội dung</label>
                            <textarea
                                rows={3}
                                className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-red-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4 pt-6 border-t">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 py-4 rounded-lg font-bold text-white transition-all shadow-lg ${
                                    loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                                }`}
                            >
                                {loading ? "ĐANG TẢI LÊN & XỬ LÝ..." : "XUẤT BẢN BÀI VIẾT VIDEO"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-10 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                            >
                                HỦY
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default CreatePostVideoNew;
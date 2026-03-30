import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { CategoryResponse } from "../../types/category.type";
import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";
import uploadService from "../../services/uploadService"; 
import { getAccessToken } from "../../utils/auth";
import AdminLayout from "../../layouts/AdminLayout";

// Định nghĩa kiểu dữ liệu cho bài Post (giống Swagger)
interface CreatePostInput {
    categoryId: number;
    title: string;
    content: string; // ReactQuill sẽ lưu HTML vào đây
    createdAt: string;
    media: any[];    // Bạn có thể xử lý ảnh đại diện nếu cần
}

function CreatePostPage() {
    const navigate = useNavigate();
    const quillRef = useRef<ReactQuill>(null); // Dùng để tham chiếu tới editor

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false); 
    
    // State chỉ lưu những trường văn bản cơ bản
    const [formData, setFormData] = useState({
        idCategory: "",
        title: "",
    });
    
    // State riêng để lưu nội dung HTML từ ReactQuill
    const [editorContent, setEditorContent] = useState("");

    // 1. Load Chuyên mục
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategoriesApi(1);
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, idCategory: data[0].id.toString() }));
                }
            } catch (error) {
                console.error("Không lấy được danh mục", error);
            }
        };
        loadCategories();
    }, []);

    // 2. Hàm xử lý upload ảnh khi người dùng bấm nút chèn ảnh của Quill
    const imageHandler = () => {
        // Tạo một input file ẩn để mở cửa sổ chọn file
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                setLoading(true);

                try {
                    // BƯỚC A: Đẩy ảnh lên server qua API upload
                    const uploadRes = await uploadService.uploadPostMedia(file);
                    // Bổ sung domain của Backend để ảnh hiển thị được trên client
                    const imageUrl = `https://localhost:7212${uploadRes.url}`;

                    // BƯỚC B: Chèn URL ảnh đó vào đúng vị trí con trỏ chuột trong editor
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection();
                        // Chèn ảnh dạng thẻ HTML
                        quill.insertEmbed(range?.index || 0, 'image', imageUrl);
                    }
                } catch (error) {
                    console.error("Lỗi upload ảnh bài viết:", error);
                    alert("Không thể upload ảnh, vui lòng thử lại.");
                } finally {
                    setLoading(false);
                }
            }
        };
    };

    // 3. Cấu hình Toolbar cho ReactQuill (Dùng useMemo để tránh re-render)
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],        // định dạng chữ
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // danh sách
                ['link', 'image'],                                // chèn link và ảnh
                ['clean']                                         // xóa định dạng
            ],
            handlers: {
                // Thay thế handler chèn ảnh mặc định bằng hàm imageHandler của mình
                'image': imageHandler 
            }
        }
    }), []);

    // 4. Hàm Gửi Tin (Submit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = getAccessToken();
        if (!token) {
            alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
            return;
        }

        if (!formData.idCategory) return alert("Vui lòng chọn danh mục!");
        if (editorContent.trim().length === 0) return alert("Vui lòng nhập nội dung!");

        setLoading(true);

        try {
            // Chuẩn bị dữ liệu ĐÚNG theo mẫu Swagger của bạn
            const imgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i;
            const match = editorContent.match(imgRegex);

            let mediaPayload: any[] = [];

           if (match && match[1]) {
            const fullUrl = match[1];
            // Log ra để bạn kiểm tra trong F12 xem đã bắt được URL chưa
            console.log("Tìm thấy ảnh đại diện:", fullUrl);

            mediaPayload = [
                {
                    // Lấy đường dẫn tương đối để gửi lên server (bỏ domain)
                    url: fullUrl.replace('https://localhost:7212', ''),
                    mediaType: 1, 
                    orderIndex: 0,
                    isThumbnail: true
                }
            ];
        } else {
            console.warn("Không tìm thấy thẻ img nào trong nội dung.");
        }
        
            const finalPostData: CreatePostInput = {
                categoryId: Number(formData.idCategory),
                title: formData.title,
                // Lấy nội dung HTML từ state của ReactQuill
                content: editorContent,
                createdAt: new Date().toISOString(),
                // Mảng media tạm thời để trống hoặc bạn có thể xử lý ảnh thumbnail nếu muốn
                media: mediaPayload
            };

            const result = await postService.createPost(finalPostData);
            
            alert("Đăng bài thành công!");
            // result.id là id của bài viết mới (Vd: 15 như Swagger)
            navigate(`/chitiettin/${result.id}`);
        } catch (error: any) {
            console.error("Lỗi khi đăng bài:", error.response?.data);
            alert("Lỗi khi đăng bài. Vui lòng kiểm tra Console để xem chi tiết lỗi từ Server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-50 min-h-screen overflow-x-hidden">
                <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl">
                    <h1 className="text-2xl font-bold mb-8 text-red-700 border-b pb-4">
                        ĐĂNG TIN HOẠT ĐỘNG
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Chuyên mục */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Chuyên mục bài viết</label>
                            <select
                                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none transition"
                                value={formData.idCategory}
                                onChange={(e) => setFormData({ ...formData, idCategory: e.target.value })}
                            >
                                <option value="">-- Chọn chuyên mục --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tiêu đề */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                required
                                placeholder="Nhập tiêu đề tin tức..."
                                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        {/* Nội dung với ReactQuill */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Nội dung chi tiết</label>
                            <div className="quill-container h-[400px] mb-12"> {/* Đặt chiều cao cho editor */}
                                <ReactQuill 
                                    ref={quillRef} // Gán tham chiếu
                                    theme="snow"
                                    value={editorContent} // Giá trị HTML
                                    onChange={setEditorContent} // Cập nhật state
                                    modules={modules} // Cấu hình Toolbar và Handler
                                    placeholder="Bắt đầu viết nội dung và chèn ảnh tại đây..."
                                    className="h-full" // Chiều cao nội dung bên trong editor
                                />
                            </div>
                        </div>

                        {/* Nút bấm */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${
                                    loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                                } text-white px-8 py-3 rounded-lg font-bold transition shadow-lg flex items-center`}
                            >
                                {loading ? "ĐANG XỬ LÝ..." : "XUẤT BẢN BÀI VIẾT"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
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

export default CreatePostPage;
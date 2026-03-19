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

interface CreatePostInput {
    categoryId: number;
    title: string;
    content: string; 
    createdAt: string;
    media: any[];   
}

function CreatePostTrialNew() {
    const navigate = useNavigate();
    const quillRef = useRef<ReactQuill>(null);

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false); 
    
    const [formData, setFormData] = useState({
        idCategory: "",
        title: "",
    });
    

    const [editorContent, setEditorContent] = useState("");


    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategoriesApi(2);
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

    
    const imageHandler = () => {
     
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                setLoading(true);

                try {
                    const uploadRes = await uploadService.uploadPostMedia(file);
                    const imageUrl = `https://localhost:7212${uploadRes.url}`;
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection();
                 
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

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],        
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
                ['link', 'image'],                               
                ['clean']                                       
            ],
            handlers: {
              
                'image': imageHandler 
            }
        }
    }), []);


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
        
            const imgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/i;
            const match = editorContent.match(imgRegex);

            let mediaPayload: any[] = [];

           if (match && match[1]) {
            const fullUrl = match[1];
        

            mediaPayload = [
                {
           
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
             
                content: editorContent,
                createdAt: new Date().toISOString(),
        
                media: mediaPayload
            };

            const result = await postService.createPost(finalPostData);
            
            alert("Đăng bài thành công!");
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
                        ĐĂNG TIN XÉT XỬ
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
    
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

            
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Nội dung chi tiết</label>
                            <div className="quill-container h-[400px] mb-12"> 
                                <ReactQuill 
                                    ref={quillRef} 
                                    theme="snow"
                                    value={editorContent} 
                                    onChange={setEditorContent} 
                                    modules={modules} 
                                    placeholder="Bắt đầu viết nội dung và chèn ảnh tại đây..."
                                    className="h-full" 
                                />
                            </div>
                        </div>

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

export default CreatePostTrialNew;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CategoryResponse } from "../../types/category.type";
import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAccessToken } from "../../utils/auth";



function CreatePostPage(){
    const navigate = useNavigate();
    const [catecories, setCatecories] = useState<CategoryResponse[]>([]); 
    const [file, setFile] = useState<File | null>(null);
    const [fromData, setFromData] = useState({idCategory: "", title: "",doc: "",date: new Date().toISOString()})


    useEffect(() => {
        const loadCategories =async () =>{
            try{
                const data = await getCategoriesApi();
                setCatecories(data);
                if (data.length > 0) {
                    setFromData(prev => ({ ...prev, idCategory: data[0].id.toString() }));
                }
            }catch(error){
                console.error("Khong lay duoc ID", error);
            }
        };
        loadCategories();
    },[]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAccessToken();
    if (!token) {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        return;
    }
    
        if (!fromData.idCategory) return alert("Vui lòng chọn danh mục!");

        const data = new FormData();
        data.append("IdCategory", fromData.idCategory);
        data.append("Title", fromData.title);
        data.append("Doc", fromData.doc);
        data.append("Date", fromData.date);
        if (file) data.append("Image", file);

        try {
            const result = await postService.createPost(data);
            
            navigate(`/chitiettin/${result.id}`);
        } catch (error) {
            alert("Lỗi khi đăng bài. Vui lòng kiểm tra lại.");
        }
    };
    return(
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl">
                <h1 className="text-2xl font-bold mb-8 text-red-700 border-b pb-4">ĐĂNG TIN HOẠT ĐỘNG</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Chuyên mục bài viết</label>
                        <select 
                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none transition"
                            value={fromData.idCategory}
                            onChange={(e) => setFromData({...fromData, idCategory: e.target.value})}
                        >
                            <option value="">-- Chọn chuyên mục --</option>
                            {catecories.map((cat) => (
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
                            value={fromData.title}
                            onChange={(e) => setFromData({...fromData, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Ảnh minh họa</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg bg-gray-50"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Nội dung chi tiết</label>
                        <textarea 
                            rows={12}
                            required
                            placeholder="Sử dụng các thẻ HTML như <h2>, <p>, <ul> để định dạng nội dung..."
                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-red-500 outline-none font-mono text-sm"
                            value={fromData.doc}
                            onChange={(e) => setFromData({...fromData, doc: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="submit"
                            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg"
                        >
                            XUẤT BẢN BÀI VIẾT
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
            <Footer />
        </div>
    );
}

export default CreatePostPage;
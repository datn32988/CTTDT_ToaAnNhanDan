import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Category from "../../../components/Catecory";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Notification from "../../../components/Notification";
import VerticalBanner from "../../../components/VerticalBanner";
import { postService } from "../../../services/postService";
import type { Post } from "../../../types/Post.type";

function PostDetailPage() {
    const { id } = useParams<{ id: string }>(); 
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = "https://localhost:7212";

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            const  numericId = Number(id)

            try {
                setLoading(true);
                const data = await postService.getPostDetail(numericId);
                setPost(data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
        // Cuộn lên đầu trang khi vào trang chi tiết
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="text-center mt-10">Đang tải nội dung...</div>;
    if (!post) return <div className="text-center mt-10">Không tìm thấy bài viết.</div>;

    return (
        <div className="overflow-x-hidden">
            <Header />
            <Notification />
            <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">
                <div className="col-span-1 w-full">
                    <Category />
                    <VerticalBanner />
                </div>

         
                <div className="col-span-3 bg-white pl-8 pr-4">
                    <div className="pt-4 mb-6 text-sm text-gray-600">
                        <Link to="/" className="hover:text-red-500">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/tin-tuc" className="hover:text-red-500">Tin hoạt động</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-400">Chi tiết bài viết</span>
                    </div>

                    <h1 className="text-2xl font-bold text-blue-900 mb-2">
                        {post.title}
                    </h1>

                    <p className="text-sm text-gray-500 mb-6 italic">
                        Ngày đăng: {new Date(post.date).toLocaleDateString("vi-VN")}
                    </p>

                    <hr className="mb-6" />

                    <div 
                        className="prose prose-blue max-w-none detail-content"
                        dangerouslySetInnerHTML={{ __html: post.doc }} 
                    />
                    
                    {post.image && (
                        <div className="mt-8 flex justify-center">
                            <img 
                                src={`${BASE_URL}/${post.image}`} 
                                alt={post.title} 
                                className="max-w-full h-auto rounded shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostDetailPage;
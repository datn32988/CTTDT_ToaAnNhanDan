import {  Link, useParams } from "react-router-dom";
import PostArticleLayout from "../../layouts/PostArticleLayout";
import { useEffect, useState } from "react";
import type { PostListItem, Post } from "../../types/Post.type";
import { postService } from "../../services/postService";
import PostImageNew from "../../components/PostImageNew";



function PostImageDetail(){
    const { id } = useParams<{ id: string }>(); 

    const [post, setPost] = useState<Post | null>(null);
    const [anotherPosts, setAnotherPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const numericId = id ? Number(id) : 0;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const BASE_URL = "https://localhost:7212";
    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await postService.getPostDetail(numericId);
                const data1 = await postService.getPostByRootCategory(3,1);
                setPost(data);
                setAnotherPosts(data1.items);
                setSelectedIndex(0);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
        
        window.scrollTo(0, 0);
    }, [id]);
   const currentMedia = post?.media?.[selectedIndex];
   const [firstPost, ...remainingPosts] = anotherPosts;
   const handleNext = () => {
        if (!post || !post.media || post.media.length === 0) return;

        setSelectedIndex((prev) => (prev + 1) % post.media.length);
    };

    const handlePrev = () => {
        if (!post || !post.media || post.media.length === 0) return;

        setSelectedIndex((prev) => 
            (prev - 1 + post.media.length) % post.media.length
        );
    };
    if (loading) return <div className="text-center mt-10">Đang tải nội dung...</div>;
    if (!post) return <div className="text-center mt-10">Không tìm thấy bài viết.</div>;

    return(
        <PostArticleLayout>
            <div className="bg-white ml-[160px] mr-[127px]">
                <div className="pt-3">
                    <h1>Trang chủ / Tin Ảnh </h1>
                     <div className="border-b-2 border-red-500  bg-gray-200 my-4">
                    <h1 className="text-red-500 text-xl py-2 pl-2 ">TIN ẢNH : {post.title}</h1>
                </div>
                <div className="grid grid-cols-3 p-2">
                    <div className="col-span-2">
                       <div className="col-span-2 space-y-4">
                            <div className="relative group overflow-hidden bg-gray-100 flex items-center justify-center h-[500px]">
                                <button 
                                    onClick={handlePrev}
                                    className="absolute left-2 z-10 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ❮
                                </button>

                              
                                <img 
                                    key={currentMedia?.id} 
                                    src={`${BASE_URL}${currentMedia?.url}`}
                                    alt="Detail"
                                    className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out transform scale-100"
                                />

               
                                <button 
                                    onClick={handleNext}
                                    className="absolute right-2 z-10 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ❯
                                </button>
                            </div>

                            <div className="bg-gray-50 p-4 italic text-center text-gray-700 border-l-4 border-red-500">
                                {post.content}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                       <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[600px]">
                                {post.media.map((item, index) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => setSelectedIndex(index)}
                                        className={`cursor-pointer border-2 transition-all ${
                                            selectedIndex === index ? "border-red-500 scale-95" : "border-transparent hover:border-gray-300"
                                        }`}
                                    >
                                        <img 
                                            src={`${BASE_URL}${item.url}`} 
                                            className="w-full h-20 object-cover"
                                            alt="Thumbnail" 
                                        />
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 py-8 w-[900px]">
                    {remainingPosts.map((post) => (
                        <div key={post.id} className="col-span-1">
                            <Link to={`/thuvienanh/${post.id}`}>
                            <PostImageNew 
                                image={post.thumbnailUrl ? `${BASE_URL}${post.thumbnailUrl}` : "https://via.placeholder.com/400x250"}
                                date={new Date(post.createdAt)} 
                                title={post.title}
                            /></Link>
                        </div>
                    ))}
                </div>

                </div>
            </div>
        </PostArticleLayout>
        
    );

}

export default PostImageDetail;
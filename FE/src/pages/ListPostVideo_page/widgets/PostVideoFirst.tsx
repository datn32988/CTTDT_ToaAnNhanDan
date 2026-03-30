import { useEffect, useState } from "react";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import type { PostListVideoItem } from "../../../types/Post.type";
import { postService } from "../../../services/postService";
import { getThumbnail, getMediaUrl } from "../../../helper/helper";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostImageNew from "../../../components/PostImageNew";
function PostVideoFirst() {
    const [posts, setPosts] = useState<PostListVideoItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const BASE_URL = "https://localhost:7212";
    const totalPages = 5; 
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await postService.getPostByIdCategoryVideo(19, page);

                setPosts(data.items);
            } catch (error) {
                console.error("Lỗi fetch api", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [page]);

    if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    if (posts.length === 0) return <div className="ml-[160px]">Không có dữ liệu</div>;

    const latestPost = posts[0];
    const gridPosts = posts.slice(1, 4);
    const anthorPost = posts.slice(4);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const thumbnail = getThumbnail(latestPost.thumbnailUrl);
    const videoUrl = getMediaUrl(latestPost.videoUrl);

    return (
        <div className="ml-[160px] mr-[127px] font-sans">

            <div className="grid grid-cols-2 gap-6 mt-4 border-b pb-6 p-4 shadow-sm">


                <div className="col-span-1">
                    <div className="aspect-video w-full">
                        {playingId !== latestPost.id ? (
                            <div
                                className="relative w-full h-full cursor-pointer"
                                onClick={() => setPlayingId(latestPost.id)}
                            >
                                <img
                                    src={thumbnail}
                                    className="w-full h-full object-cover"
                                    alt={latestPost.title}
                                />

                                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-black/20 hover:bg-black/40">
                                    <FaPlay></FaPlay>
                                </div>
                            </div>
                        ) : (
                            videoUrl ? (
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img src={thumbnail} />
                            )
                        )}
                    </div>
                </div>

                <div className="col-span-1 flex flex-col">
                    <div className="py-4">
                        <h2 className="text-xl font-bold hover:text-red-600 cursor-pointer">
                            {latestPost.title}
                        </h2>
                    </div>

                    <div className="flex space-x-2 py-5">
                        <a href="#" className="text-blue-500"><CiFacebook /></a>
                        <a href="#" className="text-blue-400"><CiTwitter /></a>
                        <a href="#" className="text-red-500"><CgMail /></a>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {gridPosts.map((post) => {
                            const thumb = getThumbnail(post.thumbnailUrl);
                            return (
                                 <Link to={`/tinvideo/${post.id}`}>
                                <div
                                    key={post.id}
                                    className="flex flex-col gap-2 cursor-pointer"
                                  
                                >
                                    <div className="aspect-video w-full relative">
                                        <img
                                            src={thumb}
                                            className="w-full h-full object-cover"
                                            alt={post.title}
                                        />
                                    </div>

                                    <h3 className="text-[12px] font-semibold line-clamp-3 hover:text-red-600">
                                        {post.title}
                                    </h3>
                                </div></Link>
                            );
                        })}
                    </div>

                </div>
            </div>
            <div>
                <div className="w-[840px]">
                     <div className="border-b-2 border-red-500  py-3">
                    <h1 className="text-red-500 text-2xl">Các video khác</h1>
                </div>
                <div className="grid grid-cols-3 gap-6 py-8 w-[1100px]">
                    {anthorPost.map((post) => (
                        <div key={post.id} className="col-span-1">
                            <Link to={`/thuvienanh/${post.id}`}>
                            <PostImageNew 
                                image={post.thumbnailUrl ? `${BASE_URL}${post.thumbnailUrl}` : "https://via.placeholder.com/400x250"}
                                date={new Date(post.createdAt)} 
                                title={post.title}
                            /></Link>
                        </div>
                    ))}
                <div className="flex items-center gap-2 w-[840px] justify-center">
                    <button disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50">
                    </button>
                    {pageNumbers.map((num) => (
                        <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1 border rounded ${
                            page === num ? 'bg-red-500 text-white' : 'bg-white'
                        }`}
                        >
                        {num}
                        </button>
                    ))}
                     <button 
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>


                </div>
                </div>
               
                
            </div>
        </div>
    );
}

export default PostVideoFirst;
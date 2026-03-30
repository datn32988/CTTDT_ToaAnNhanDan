import { useEffect, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import type { PostListVideoItem } from "../../../types/Post.type";
import { postService } from "../../../services/postService";
import { getThumbnail, getMediaUrl } from "../../../helper/helper";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
function VideosNew() {
    const [posts, setPosts] = useState<PostListVideoItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [playingId, setPlayingId] = useState<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await postService.getPostByIdCategoryVideo(19, 1);
                setPosts(data.items);
            } catch (error) {
                console.error("Lỗi fetch api", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    if (posts.length === 0) return <div className="ml-[160px]">Không có dữ liệu</div>;

    const latestPost = posts[0];
    const gridPosts = posts.slice(1, 4);
    
    
    const thumbnail = getThumbnail(latestPost.thumbnailUrl);
    const videoUrl = getMediaUrl(latestPost.videoUrl);

    return (
        <div className="ml-[160px] mr-[127px] font-sans">
            <div className="mt-4 flex items-center border-b-2 border-red-500 pb-2">
                <div className="text-red-600 text-3xl"><IoVideocam /></div>
                <h1 className="text-xl text-red-500 font-bold ml-4 uppercase">
                    Video - Phóng sự hoạt động của tòa án
                </h1>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4 border p-4 shadow-sm">


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
                                <div
                                    key={post.id}
                                    className="flex flex-col gap-2 cursor-pointer"
                                  
                                >
                                     <Link to={`/tinvideo/${post.id}`}>
                                    <div className="aspect-video w-full relative">
                                        <img
                                            src={thumb}
                                            className="w-full h-full object-cover"
                                            alt={post.title}
                                        />
                                    </div>

                                    <h3 className="text-[12px] font-semibold line-clamp-3 hover:text-red-600">
                                        {post.title}
                                    </h3></Link>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default VideosNew;
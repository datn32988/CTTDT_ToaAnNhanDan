import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Post, PostListVideoItem } from "../../types/Post.type";
import { postService } from "../../services/postService";
import PostArticleLayout from "../../layouts/PostArticleLayout";
import { getMediaUrl, getThumbnail } from "../../helper/helper";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import FeedBack from "../../components/Feedback";
import { IoVideocam } from "react-icons/io5";
import PostImageNew from "../../components/PostImageNew";

function PostVideoDetailPage(){
    const { id } = useParams<{ id: string }>(); 
    const [otherPost, setOtherPost] = useState<PostListVideoItem[]>([]);
     const [post, setPost] = useState<Post | null>(null);
     const [loading, setLoading] = useState(true);
     const numericId = id ? Number(id) : 0;
    
    
    const BASE_URL = "https://localhost:7212";
      useEffect(() => {
             const fetchDetail = async () => {
                 if (!id) return;
     
                 try {
                     setLoading(true);
                     const data = await postService.getPostDetail(numericId);
                     const data1 = await postService.getPostByIdCategoryVideo(19, 1);
                     setOtherPost(data1.items)
                     setPost(data);
                 } catch (error) {
                     console.error("Lỗi khi lấy chi tiết bài viết:", error);
                 } finally {
                     setLoading(false);
                 }
             };
     
             fetchDetail();
             
             window.scrollTo(0, 0);
         }, [id]);

          if (loading) return <div className="text-center mt-10">Đang tải nội dung...</div>;
         if (!post) return <div className="text-center mt-10">Không tìm thấy bài viết.</div>;
            const videoObj = post.media?.find(m => m.mediaType === 2);
            const videoUrl = videoObj ? getMediaUrl(videoObj.url) : "";

            const thumbObj = post.media?.find(m => m.mediaType === 1);
            const thumbnail = thumbObj ? getThumbnail(thumbObj.url) : "";

    return(
        <PostArticleLayout>
             <div className="bg-white ml-[180px] mr-[127px]">
                <div className="pt-3">
                        <h1>Trang chủ / Tin Ảnh </h1>
                        <div className="border-b-2 border-red-500  bg-gray-200 my-4">
                        <h1 className="text-red-500 text-xl py-2 pl-2 ">VIDEO - PHÓNG SỰ HOẠT ĐỘNG TOÀN ÁN</h1>
                    </div>
                    <div className="w-[800px] bg-black aspect-video relative">
                    {videoUrl ? (
                        <video 
                            controls 
                            className="w-full h-full"
                            poster={thumbnail} 
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ phát video.
                        </video>
                    ) : (
                        <div className="text-white flex items-center justify-center h-full">
                            Không có video cho bài viết này.
                        </div>
                    )}
                    
                </div>
                <div className="mt-4 w-[800px] border-b-2 border-gray-400 py-2 my-3">
                    <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                    <p className="text-gray-500 text-sm mt-2">
                         {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                    <div className="flex space-x-2  pt-4">
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                                <CiFacebook />
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-600">
                                <CiTwitter />
                            </a>
                            <a href="#" className="text-red-500 hover:text-red-700">
                                <CgMail />
                            </a>
                    </div>

                     
                </div>
                <div className="mt-4 w-[800px]  pb-2">
                      <h1 className="text-lg font-bold text-black pb-2">{post.content}</h1>
                    <FeedBack postId={numericId}/>
                </div>
                <div className=" text-red-500 border-b-2 border-red-500 w-[800px] pb-2">
                    <div className="flex">
                        <h1 className="text-3xl"><IoVideocam />  </h1>
                        <h1 className="ml-2 text-3xl" >Video liên quan</h1 >
                    </div>
                    <div className=" grid grid-cols-3 gap-3 p-2"> 
                        {otherPost.map((post) => (
                            <div key={post.id} className="col-span-1">
                                <Link to={`/tinvideo/${post.id}`}>
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

         </div>
        </PostArticleLayout>
        

    );
}
export default PostVideoDetailPage;
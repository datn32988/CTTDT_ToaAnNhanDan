import { useState, useEffect } from "react";
import banner1 from "../../../assets/bn565_1_1528336294950.png";
import banner2 from "../../../assets/bn565_2_1528336723310.png";
import image7 from "../../../assets/bg-tle.png";
import { postService } from "../../../services/postService";
import type { PostListItem } from "../../../types/Post.type";
import { Link } from "react-router-dom";

function TrialNew() {
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BASE_URL = "https://localhost:7212";
      useEffect(() => {
      
              const loadData = async () => { 
              try {
                  setLoading(true);
                  const data = await postService.getPostByRootCategory(2,1);
                  setPosts(data.items);
              } catch (error) {
                  console.error("Lỗi fetch api" ,error)
              } finally{
                  setLoading(false);
              }
          }
          loadData();
             
          },[]);

        const latestPost = posts[0];          
        const gridPosts = posts.slice(1, 5);   
        const listPosts = posts.slice(2,5);
        
        if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    return (
        <div className="ml-[160px] mr-[127px]">
             <Link to={"/danhsach/category/2"}>
                <div className=" mt-4 flex  border-l-8 border-red-700">
                    <h1 className="bg-red-500 text-2xl text-white font-bold px-6 py-2 inline-block">Tin xét xử</h1>
                    <img src={image7} alt="" className="border-r-2 border-red-400" />
                </div>
            </Link>
            <div className="border-t-2 border-t-red-500 w-full h-[500px] border-x-2 border-gray-50">
                <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="col-span-2 p-1  ">
                        {latestPost && (
                        <>
                         <Link to={`/chitiettin/${latestPost.id}`}>
                            <img src={`${BASE_URL}/${latestPost.thumbnailUrl}`} className="w-full h-auto object-cover" alt="" />
                            <h2 className="text-2xl font-bold leading-tight hover:text-red-600 cursor-pointer">
                                {latestPost.title} <span className="font-light text-lg">
                                    ({latestPost.createdAt})
                                </span>
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                {latestPost.title}
                            </p>
                            </Link>
                        </>
                    )}    
                    </div>
                    <div className="col-span-3 p-4">
                        <div className="grid grid-cols-4 gap-4">
                        {gridPosts.map((post) => (
                            <div key={post.id} className="group cursor-pointer">
                                 <Link to={`/chitiettin/${post.id}`}>
                                <img src={`${BASE_URL}/${post.thumbnailUrl}`} className="w-full h-24 object-cover mb-2" alt="" />
                                <h3 className="text-[13px] font-semibold leading-snug group-hover:text-red-600 line-clamp-3">
                                    {post.title}
                                </h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                        <div className="border-t border-gray-200 pt-4 flex flex-col gap-3 p-4 m-3">
                        {listPosts.map((post) => (
                            <div key={post.id} className="flex items-start gap-2 group cursor-pointer">
                                
                                <span className="text-red-600 mt-1.5">•</span>
                                <div className="flex flex-col">
                                    <Link to={`/chitiettin/${post.id}`}>
                                        <h4 className="text-[15px] font-medium group-hover:text-red-600">
                                            {post.title} 
                                            <span className="text-gray-400 text-xs ml-2 font-normal">
                                                ({post.createdAt})
                                            </span>
                                        </h4>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex justify-between  py-4">
                  <img src={banner1} alt="" />      
                  <img src={banner2} alt="" />    
            </div>
        </div>
    );
}   

export default TrialNew;
import { useEffect, useRef, useState } from "react";
import image7 from "../../../assets/bg-tle.png";
import { postService } from "../../../services/postService";
import type { PostListItem } from "../../../types/Post.type";
import { Link } from "react-router-dom";

function ImageNew() {
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
     const BASE_URL = "https://localhost:7212";
    useEffect(() => {
            const fetchDetail = async () => {
         
                try {
                    setLoading(true);
                  
                    const data = await postService.getPostByRootCategory(3,1);
                    setPosts(data.items)
                } catch (error) {
                    console.error("Lỗi khi lấy chi tiết bài viết:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchDetail();
            
            window.scrollTo(0, 0);
        }, []);
    const scroll = (directive: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = directive === "left" 
                ? scrollLeft - clientWidth /2 
                : scrollLeft + clientWidth/2  ;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }   
    };
     if (loading) return <div className="text-center mt-10">Đang tải nội dung...</div>;
    if (!posts) return <div className="text-center mt-10">Không tìm thấy bài viết.</div>;
    return (
        <div className="ml-[160px] mr-[127px]">
            <Link to={`/thuvienanh`}>
              <div className=" mt-4 flex  border-l-8 border-red-700">
                <h1 className="bg-red-500 text-2xl text-white font-bold px-6 py-2 inline-block">Tin ảnh</h1>
                <img src={image7} alt="" className="" />
            </div>
            </Link>
            <div className="border-t-2 border-t-red-500 w-full h-full border-x-2 border-gray-50">
                 <div className="relative group bg-[#ffffff] border-y border-gray-50">
           
            <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto scrollbar-hide gap-7 px-10 scroll-smooth  py-3"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                     <button 
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white text-orange-800" >
                    &#10094;
            </button>
                    {posts.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-[270px] flex flex-col items-center text-center cursor-pointer rounded-lg"
                        >
                           <Link to={`/thuvienanh/${item.id}`}>
                            <div className="">
                                
                                <img src={`${BASE_URL}${item?.thumbnailUrl}`} alt={item.title} className="w-full h-full object-cover mb-3 rounded-sm" />
                            </div>
                            
                            <span className="text-[11px] text-[#555] uppercase leading-tight  hover:text-red-600 pt-4">
                                {item.title}
                            </span>
                            </Link>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white text-orange-800"
                >
                    &#10095;
                </button>

                    
        </div>
            </div>
        </div>

    );
}


export default ImageNew;
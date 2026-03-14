import { useEffect, useRef, useState } from "react";
import image7 from "../../../assets/bg-tle.png";
interface PostItem {
    id: string;
    title: string;
    image: string;
}

function ImageNew() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fakeData: PostItem[] = [
            { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 10 của Hội đồng Thẩm phán Tòa án nhân dân tối cao ", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "45/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 9 của Hội đồng Thẩm phán Tòa án nhân dân tối cao ", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "46/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 8 của Hội đồng Thẩm phán Tòa án nhân dân tối cao ", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "47/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 7  của Hội đồng Thẩm phán Tòa án nhân dân tối cao", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "48/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 6 của Hội đồng Thẩm phán Tòa án nhân dân tối cao ", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" }
        ];
        setPosts(fakeData);
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
    return (
        <div className="ml-[160px] mr-[127px]">
              <div className=" mt-4 flex  border-l-8 border-red-700">
                <h1 className="bg-red-500 text-2xl text-white font-bold px-6 py-2 inline-block">Tin ảnh</h1>
                <img src={image7} alt="" className="" />
            </div>
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
                           
                            <div className="">
                                
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover mb-3 rounded-sm" />
                            </div>
                            
                            <span className="text-[11px] text-[#555] uppercase leading-tight  hover:text-red-600 pt-4">
                                {item.title}
                            </span>
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
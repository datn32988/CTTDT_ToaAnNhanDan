import  { useState, useEffect } from "react";
import Panner from "../../../assets/9b41b6b4c8284537dd952e4a476fa0b5.jpg";

interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
}

function Slider() {
    const [news, setNews] = useState<NewsItem[]>([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
    };
  
    useEffect(() => {
        const fakeData = [
            { id: 1, title: "bai viet so 1", date: "2023-01-01", image: Panner },
            { id: 2, title: "bai viet so 2", date: "2023-01-02", image: Panner },
            { id: 3, title: "bai viet so 3", date: "2023-01-03", image: Panner },
            { id: 4, title: "bai viet so 4", date: "2023-01-04", image: Panner },
        ];
        setNews(fakeData);
    }, []);
    
    const currentPost = news[currentIndex];
    if (!currentPost) return <div className="min-h-[400px] flex items-center justify-center w-full">Loading...</div>;
    
    return (
        <div className="w-full max-w-full  bg-white">
            <div className="relative w-full max-w-full overflow-hidden shadow-2xl group">
                
                {/* Ảnh nền */}
                <img 
                    src={currentPost.image} 
                    alt={currentPost.title} 
                    className="w-full h-[510px] object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 
                    flex flex-col justify-center items-center  gap-6
                    px-4 md:px-10 py-6
                    bg-gradient-to-t from-black/70 to-transparent
                    text-white">

                        <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight uppercase max-w-3xl">
                            {currentPost.title}
                        </h3>

                        {/* Row dưới */}
                        <div className="flex items-center ">

                            {/* Left */}
                            <div className="flex items-center gap-3">
                                <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase rounded-sm">
                                    Tin hoạt động tòa án nhân dân tối cao
                                </span>

                                <span className="text-sm opacity-90">
                                    {currentPost.date}
                                </span>
                            </div>

                            <div className="flex gap-2 ml-8">
                                {news.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === currentIndex
                                                ? "bg-red-600 w-4"
                                                : "bg-white/60 w-2 hover:bg-white"
                                        }`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                {/* Nút điều khiển */}
                <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
                    <button 
                        onClick={prevSlide}
                        className="p-2 md:p-4 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/40 transition-all text-white shadow-lg"
                        aria-label="Previous slide"
                    >
                        <svg className="size-5 md:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button 
                        onClick={nextSlide}
                        className="p-2 md:p-4 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/40 transition-all text-white shadow-lg"
                        aria-label="Next slide"
                    >
                        <svg className="size-5 md:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                
            </div>

            
        </div>
    );
}

export default Slider;
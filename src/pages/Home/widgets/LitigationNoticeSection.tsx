import { useRef } from "react";
import { BiCalendar } from "react-icons/bi";
import { BiBlanket } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import image1 from "../../../assets/trongdong1.png";
import image2 from "../../../assets/bg-totung.gif";
function LitigationNoticeSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const menuItems = [
            { icon: <BiCalendar size={32} />, label: "Tuyên bố phá sản" },
            { icon: <BiBlanket size={32} />, label: "Thụ lý vụ án" },
            { icon: <BiUser size={32} />, label: "Tìm người vắng mặt tại nơi cư chú" },
            { icon: <FaCloudUploadAlt size={32} />, label: "Tống đạt" },
            { icon: <LuUsers size={32} />, label: "Kết quả ủy thác tư pháp" },  
            { icon: <BiCalendar size={32} />, label: "Tuyên bố phá sản" },
            { icon: <BiBlanket size={32} />, label: "Thụ lý vụ án" },
            { icon: <BiUser size={32} />, label: "Tìm người vắng mặt tại nơi cư chú" },
            { icon: <FaCloudUploadAlt size={32} />, label: "Tống đạt" },
            { icon: <LuUsers size={32} />, label: "Kết quả ủy thác tư pháp" },  
            
        ];
        const scroll = (direction : "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" 
                ? scrollLeft - clientWidth /2 
                : scrollLeft + clientWidth/2  ;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }

    };
    return (
        <div className="bg-white w-full">
        <div className="flex justify-center" style={{ backgroundImage: `url(${image2})` }}>
            <h2 className="text-2xl font-bold border-2 border-red-600  px-6 py-1 
                        w-fit mx-auto text-red-600
                        rounded-full bg-white">
                THÔNG BÁO VĂN BẢN TỐ TỤNG
            </h2>
        </div>
        <div className="relative group bg-[#ffffff] border-y border-gray-50">
           
            <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto scrollbar-hide gap-10 px-10 scroll-smooth ml-[160px] mr-[160px] py-3"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                     <button 
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white text-orange-800" >
                    &#10094;
            </button>
                    {menuItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-[200px] flex flex-col items-center text-center cursor-pointer bg-yellow-200 p-2 rounded-lg"style={{ backgroundImage: `url(${image1})`, backgroundPosition: "center", backgroundRepeat: "no-repeat"  }}
                        >
                           
                            <div className="w-16 h-16 bg-[#D43131] rounded-full flex items-center justify-center text-white mb-3 text-3xl shadow-lg border-10 border-white">
                                {item.icon}
                            </div>
                            
                            <span className="text-[13px] font-bold text-[#555] uppercase leading-tight  hover:text-red-600">
                                {item.label}
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
    );
}

export default LitigationNoticeSection;
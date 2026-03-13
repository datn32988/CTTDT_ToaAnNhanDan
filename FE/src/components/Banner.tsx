import image from "../assets/Banner_bau_cu_1772682798864.jpg";
import { BiCalendar } from "react-icons/bi";
import { BiBlanket } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { TbCalendarUser } from "react-icons/tb";
import { TbUserCheck } from "react-icons/tb";
import { BiCalendarCheck } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useRef } from "react";
import image2 from "../assets/bg-lienket.png";
function Banner() {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const menuItems = [
        { icon: <BiCalendar size={32} />, label: "Văn bản quy phạm pháp luật" },
        { icon: <BiBlanket size={32} />, label: "Án lệ" },
        { icon: <BiUser size={32} />, label: "Công bố bản án quyết định của tòa án" },
        { icon: <FaCloudUploadAlt size={32} />, label: "Biểu mẫu tố tụng" },
        { icon: <LuUsers size={32} />, label: "Nộp đơn và tra cứu kết quả trực tuyến" },  
        { icon: <BiBlanket size={32} />, label: "Tương trợ tư pháp" },
        { icon: <TbCalendarUser size={32} />, label: "Lịch xét sử" },
        { icon: <BiCalendarCheck size={32} />, label: "Lịch tiếp công dân người chỉ dẫn" },
        { icon: <BiCalendarCheck size={32} />, label: "Bộ quy tắc nghề nghiệp" },
        { icon: <TbUserCheck size={32} />, label: "Sổ tay nghiệp vụ" },
        { icon: <BiBlanket size={32} />, label: "Nghiên cứu Xây dựng pháp luật" },
        { icon: <BiBlanket size={32} />, label: "Thông tin đề tài nghiên cứu khoa học" },
        { icon: <TfiMenuAlt size={32} />, label: "Lịch công tác của lãnh đạo" },
        { icon: <TfiMenuAlt size={32} />, label: "Danh bạ" },
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
        
        <div className="relative group  border-y border-orange-200 py-6"  style={{ backgroundImage: `url(${image2})` }}>
            <button 
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white text-orange-800" >
                    &#10094;
            </button>
            <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto scrollbar-hide gap-10 px-10 scroll-smooth ml-[160px] mr-[160px]"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {menuItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-[160px] flex flex-col items-center text-center cursor-pointer "
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
        <img src={image} alt="Banner"  className=" ml-[160px] mr-[160px] w-[1230px] py-3" />
    </div>
    );
}
export default Banner;
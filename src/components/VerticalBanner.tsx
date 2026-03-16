import {  useEffect, useState } from "react";
import image1 from "../assets/trongdong1.png";

interface bannerPostItem{
    id: number,
    title: string,
    date: Date
}

function VerticalBanner(){
    const[post, setPost] = useState<bannerPostItem[]>([])

     useEffect(() => {
        const fakeData : bannerPostItem[] = [
            {id: 1,title: "Công văn 44/TANDTC-KHTC về việc hướng dẫn đề xuất bổ sung kế hoạch vốn đầu tư công năm 2026", date:new Date("2024-01-15")},
            {id: 2,title: "Công văn 44/TANDTC-KHTC về việc hướng dẫn đề xuất bổ sung kế hoạch vốn đầu tư công năm 2026", date:new Date("2024-01-15")},
            {id: 3,title: "Công văn 44/TANDTC-KHTC về việc hướng dẫn đề xuất bổ sung kế hoạch vốn đầu tư công năm 2026", date:new Date("2024-01-15")},
            {id: 4,title: "Công văn 44/TANDTC-KHTC về việc hướng dẫn đề xuất bổ sung kế hoạch vốn đầu tư công năm 2026", date:new Date("2024-01-15")},
            {id: 5,title: "Công văn 44/TANDTC-KHTC về việc hướng dẫn đề xuất bổ sung kế hoạch vốn đầu tư công năm 2026", date:new Date("2024-01-15")}
        ];
        setPost(fakeData);
     },[]);

     if(post == null) return(
        <div className="ml-[160px]">Đang tải...</div>
     );

    return(
        <div className="pt-2">
            <div className=" bg-red-500">
                <h1 className="text-white text-2xl pl-4 py-2">THÔNG BÁO ĐIỀU HÀNH CHỈ ĐẠO</h1>
            </div>
            <div className="border-2 border-gray-300">
                {post.map((item) => (
                    <div key={item.id}>
                        <h2 className="py-2 px-3 bg-white cursor-pointer border-b border-gray-200 hover:text-red-500 pl-4"> <span className="text-red-500">● </span> {item.title} <span className="text-black text-sm font-extralight">({item.date.toLocaleDateString()})</span></h2>
                </div>
                ))}
                <div className="flex justify-end mt-4 mr-4 mb-5">
                            <button className="text-red-600 font-semibold ">
                                Xem thêm
                            </button>
                </div>
            </div>
             <div className=" pt-4 pb-2 mt-4">
                <h2 className="text-white bg-red-600 text-2xl pl-4">LIÊN KẾT WINDOWN</h2>
                <div className="bg-white p-4 w-full h-[165px] border-2">
                    <div className="bg-yellow-100 rounded-md p-2 object-cover" style={{ backgroundImage: `url(${image1})`,backgroundPosition: "center"}}>
                        <p className="text-lg text-center text-black py-2 hover:text-red-600">
                            Trang Thông Tin Điện Tử
                        </p>

                        <p className="text-lg font-bold text-center text-black py-2 hover:text-red-600">
                            TÒA ÁN nhân dân tỉnh, thành phố
                        </p>
                    </div>
                </div>
            </div>
                  

        </div>
    );
}

export default VerticalBanner
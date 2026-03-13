import { useState, useEffect } from "react";
import image from "../assets/aaaa_1772889718098.jpg";
import image2 from "../assets/LS_80_nam_1754490521611.jpg";
import image3 from "../assets/Du_thao_Hien_phap_1748484499365.jpg";
import image4 from "../assets/Luat_hoa_giai,_doi_thoai_tai_Toa_an_1710393413742.jpg";
import image5 from "../assets/trongdong1.png"

interface PostItem {
    id: string;
    title: string;
    date: string;
}

function MainPage() {
    const [posts, setPosts] = useState<PostItem[]>([]);
      useEffect(() => {
        const fakeData: PostItem[] = [
        { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 10 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: "2024-01-15" },
        { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 9 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: "2023-12-20" },
        { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 8 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: "2023-11-10" },
        { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 7 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: "2023-10-05" },
        { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 6 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: "2023-09-15" }
        ];

        setPosts(fakeData);

    }, []);
        return (
            <div className="bg-gray-100 min-h-screen ml-[160px] mr-[127px] mt-10 mb-10  flex flex-between gap-10">
                <div className="w-[460px] ">
                    <h2 className="text-lg font-bold mb-4 text-start uppercase tracking-wider  bg-red-500 text-white p-4 pl-6">
                        Thông Báo CHỈ ĐẠO ĐIỀU HÀNH
                    </h2>
                      <div className="bg-white p-4">
                        {posts.map((post) => (
                            <div key={post.id} className="border-b py-2">
                            <p className="text-lg"> <span className="text-red-600 font-bold">- {post.id}</span> {post.title} <span className="text-gray-500 font-light text-sm">({post.date})</span> </p>
                            
                            </div>
                        ))}
                        <div className="flex justify-end mt-4">
                            <button className="text-red-600 font-semibold">
                                Xem thêm
                            </button>
                        </div>
                </div>
            </div>
                 <div className="w-[465px]">
                    <h2 className="text-lg font-bold mb-4 text-start uppercase tracking-wider   bg-red-500 text-white p-4 pl-6">
                        NGHỊ QUYẾT HỘI ĐỒNG THẨM PHÁN
                    </h2>
                     <div className="bg-white p-4">
                        {posts.map((post) => (
                            <div key={post.id} className="border-b py-2">
                            <p className="text-lg"> <span className="text-red-600 font-bold">- {post.id}</span> {post.title} <span className="text-gray-500 font-light text-sm">({post.date})</span> </p>
                            
                            </div>
                        ))}   
                        <div className="flex justify-end mt-4">
                            <button className="text-red-600 font-semibold ">
                                Xem thêm
                            </button>
                        </div>       
                </div>
                
                </div>
                 <div className="w-[300px]">
                    <h2 className="text-lg font-bold mb-4 text-start uppercase tracking-wider   bg-red-500 text-white p-4 pl-6">
                        Liên kết websites
                    </h2>
                    <div className="bg-white p-4 w-full h-[165px] border-2">
                    <div className="bg-yellow-100 rounded-md p-2 "  style={{ backgroundImage: `url(${image5})` , backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                        <p className="text-lg text-center text-black py-2 hover:text-red-600">
                            Trang Thông Tin Điện Tử
                        </p>

                        <p className="text-lg font-bold text-center text-black py-2 hover:text-red-600">
                            TÒA ÁN nhân dân tỉnh, thành phố
                        </p>
                        
                    </div>
                    
                </div>
                <div className="py-2 ">
                        <img src={image} alt=""className="py-2 " />
                        <img src={image2} alt=""className="py-2 " />
                        <img src={image3} alt="" className="py-2 "/>
                        <img src={image4} alt="" className="py-2 "/>
                    </div>
                </div>
               
            </div>
            
        );
}

export default MainPage;
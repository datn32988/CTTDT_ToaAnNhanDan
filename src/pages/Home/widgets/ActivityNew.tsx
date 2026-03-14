import image5 from "../../../assets/Thong_tin_tuyen_dung_nam_2025_1759489465871.jpg";
import image6 from "../../../assets/e0af0872d356be51779bfe9875b978ba.jpg";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import image7 from "../../../assets/bg-tle.png";
function ActivityNew() {

    return(
        <div className="bg-gray-100 min-h-screen ml-[160px] mr-[127px] mt-10 mb-10   gap-10">
            <div>
                <img src={image5} alt="" className="w-full h-[100px] " />
            </div>

            <div className=" mt-4 flex border-l-8 border-red-700">
                <h1 className="bg-red-500 text-2xl text-white font-bold px-6 py-2 inline-block">TIN HOẠT ĐỘNG</h1>
                <img src={image7} alt="" className="border-r-2 border-red-400" />
            </div>
            <div className="bg-white w-full h-[500px] border-t-2 border-t-red-500">
                <div className="grid grid-cols-2 gap-4 p-4">
                     <img
                        src={image6}
                        className="w-full h-[360px] object-cover"
                    />

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Hội nghị giao ban công tác Tòa án nhân dân tối cao
                        </h2>

                        <p className="text-gray-600">
                            Sáng ngày 10/3, Tòa án nhân dân tối cao tổ chức Hội nghị giao ban công tác. Đồng chí Nguyễn Văn Quảng, Bí thư Trung ương Đảng, Bí thư Đảng ủy, Chánh án Tòa án nhân dân tối cao dự và chủ trì.
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
                         <div className="grid grid-cols-3 gap-4 mt-6">
                            <div><img src={image6} alt="" />
                                <p>Hội đồng tuyển chọn, giám sát Thẩm phán quốc gia họp phiên thứ hai năm 2026</p>
                            </div>
                            <div><img src={image6} alt="" />
                                <p>Đoàn đại biểu Tòa án tối cao Mông Cổ thăm và làm việc với Tòa án nhân dân thành phố Hải Phòng</p>

                            </div>
                            <div><img src={image6} alt="" />
                                Đoàn công tác Tòa án nhân dân tối cao do Phó Chánh án Nguyễn Văn Tiến làm Trưởng đoàn thăm và làm việc tại Ca-na-đa
                            </div>
                         </div>
                    </div>
                   
                </div>
            </div>

        </div>
        
    );
}

export default ActivityNew;
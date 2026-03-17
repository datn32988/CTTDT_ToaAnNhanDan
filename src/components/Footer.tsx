import image from "../assets/bn-f1.png";
import image1 from "../assets/bn-f2.png";
import image2 from "../assets/bn-f3.png";
import image3 from "../assets/bn-f4.png";
import image4 from "../assets/bn-f5.png";
import image5 from "../assets/bn-f6.png";
import image6 from "../assets/bn-f7.png";
import image7 from "../assets/bn-f8.png";

function Footer() {
    return (
        <footer className="mt-16 w-full text-white text-start bg-gray-200 ">
            <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto px-4 py-10 ba pl-10 ">
                    <div className="space-y-2 ">
                        <img src={image} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg  " />
                    </div>
                     <div className="space-y-2">
                        <img src={image1} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg"  />
                    </div>
                    <div className="space-y-2">
                        <img src={image2} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                        <img src={image3} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
               </div>
                <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto pb-10 px-4 pl-10 border-2 border-gray-200 rounded-lg">
                    <div className="space-y-2 ">
                        <img src={image4} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
                     <div className="space-y-2">
                        <img src={image5} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                        <img src={image6} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                        <img src={image7} alt="" className="  p-0 w-full h-full border-2 border-gray-200 rounded-lg" />
                    </div>
               </div>
            <div className="bg-red-500 w-full">
               

                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-4 gap-4 text-lg border-b border-red-400">
                    <div className="space-y-2">
                        <p>GIỚI THIỆU TÒA ÁN</p>
                        <p>CHÁNH ÁN TANDTC</p>
                        <p>TIN TỨC HOẠT ĐỘNG</p>
                        <p>SỰ KIỆN NỔI BẬT</p>
                    </div>

                    <div className="space-y-2 border-l border-white/30 pl-4">
                        <p>HỢP TÁC QUỐC TẾ</p>
                        <p>TỔ CHỨC CÁN BỘ</p>
                        <p>CẢI CÁCH TƯ PHÁP</p>
                        <p>VĂN BẢN TÒA ÁN</p>
                    </div>

                    <div className="space-y-2 border-l border-white/30 pl-4">
                        <p>NGHIÊN CỨU - XÂY DỰNG PHÁP LUẬT</p>
                        <p>CHỈ DẪN NGƯỜI DÂN</p>
                        <p>THÔNG TIN ĐẤU THẦU</p>
                        <p>THÔNG TIN TUYỂN DỤNG</p>
                    </div>

                    <div className="space-y-2 border-l border-white/30 pl-4">
                        <p>SƠ ĐỒ SITE | LIÊN HỆ | RSS</p>
                        <p>TRUY CẬP TRONG NGÀY: 84.609</p>
                        <p>TỔNG SỐ LƯỢT TRUY CẬP: 370.052.911</p>
                    </div>
                </div>

                
                <div className=" lg:max-w-7xl mx-auto py-8 px-4 flex  items-center">
                    <div>
                        <p className="text-sm">CỔNG THÔNG TIN ĐIỆN TỬ</p>
                        <h2 className="text-3xl font-bold mt-2">TÒA ÁN NHÂN DÂN TỐI CAO</h2>
                    </div>
                    <div className="ml-auto text-lg pl-4 px-7 space-y-1 border-l border-white/30">
                        <p>Địa chỉ: 48 Lý Thường Kiệt, Hà Nội</p>
                        <p>Điện thoại: 024.62741133</p>
                        <p>Email: banbientap@toaan.gov.vn</p>
                        <p>Trưởng Ban biên tập: Chánh Văn phòng Tòa án nhân dân tối cao.</p>
                    </div>
                </div>
            </div> 

           
            <div className="bg-red-600 w-full h-[120px] text-center text-lg pt-5">
               <p>© Bản quyền thuộc về Tòa án nhân dân tối cao.</p>
               <p>Đề nghị ghi rõ nguồn (Cổng TTĐT Tòa án nhân dân tối cao) khi đăng tải lại các thông tin, nội dung từ</p>
               <p>www.toaan.gov.vn.</p>
            </div>
        </footer>
    );
}

export default Footer;
import { Link } from "react-router-dom";

function FooterManagementDoc() {
     const menuItems = [
    {name :"CỔNG TTĐT TANDTC", path:"/gioithieu"},
    {name :"TRANG CHỦ", path:"/gioithieu"},
    {name :"VĂN BẢN PHÁP QUY", path:"/gioithieu"},
    {name :"VĂN BẢN DỰ THẢO", path:"/gioithieu"},
    {name :"CSDL QUỐC GIA VỀ VĂN BẢN PHÁP LUẬT",path:"/gioithieu"},
  ];
    return (
        <footer className="mt-16 w-full text-white text-start bg-gray-200 ">
            <div className="bg-red-500 w-full ">
                  <div className="flex items-center justify-center border-b-2 border-white">
                         <ul className="flex items-center  pt-3 pb-3">
           
                            {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link 
                                to={item.path}
                                className="text-white hover:text-yellow-400 font-medium text-[14px] tracking-wide transition-colors duration-200 border-r-2 border-white/30 p-4 "
                                >
                                {item.name}
                                </Link>
                            </li>
                            ))}
                            </ul>
                    </div>
                <div className=" lg:max-w-7xl mx-auto py-8 px-4 flex  items-start ">
                  

                    <div>
                        <p className="text-sm">CỔNG THÔNG TIN ĐIỆN TỬ</p>
                        <h2 className="text-3xl font-bold mt-2">TÒA ÁN NHÂN DÂN TỐI CAO</h2>
                        <div className="grid grid-cols-2 text-xl ">
                            <div className="col-span-1">
                                <h1>Truy cập trong ngày</h1>
                                <h1>Tổng số lượng truy cập</h1>
                            </div>
                            <div className="col-span-1 pl-[80px]">
                                <h1>861</h1>
                                <h1>2.999.688</h1>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto text-lg pl-4  space-y-1 border-l border-white/30">
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

export default FooterManagementDoc;
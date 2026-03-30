
import Logo from "../assets/logo.png";  
import { Link } from "react-router-dom";

function HeaderManagementDoc() {
    const menuItems = [
    {name :"CỔNG TTĐT TANDTC", path:"/gioithieu"},
    {name :"TRANG CHỦ", path:"/gioithieu"},
    {name :"VĂN BẢN PHÁP QUY", path:"/gioithieu"},
    {name :"VĂN BẢN DỰ THẢO", path:"/gioithieu"},
    {name :"CSDL QUỐC GIA VỀ VĂN BẢN PHÁP LUẬT",path:"/gioithieu"},
  ];
  return (
  
    <div>
      <div className="flex items-center w-full p-4 bg-slate-50 px-4 ml-[160px]">
      <img
        src={Logo}
        alt="logo"
        className="h-35 w-auto object-contain" 
      />
      <div className="ml-4">
        <p className="text-blue-500 text-xl font-bold">HỆ THỐNG VĂN BẢN</p>
        <h2 className="text-red-600 text-3xl font-bold">TOÀN ÁN NHÂN DÂN TỐI CAO</h2>

      </div>
    </div>
    <div className="bg-red-600">
       <nav className="bg-red-600 border-b border-gray-200">
        <div className="container mx-auto px-2 py-2">
          <ul className="flex items-center  pl-[160px] pr-[110px]">
           
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="text-white hover:text-yellow-400 font-medium text-[16px] tracking-wide transition-colors duration-200 border-r-2 border-white/30 p-4 "
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <a 
                href="#" 
                className="text-white hover:text-yellow-400 font-medium text-sm text-[18px]  transition-colors duration-200 "
              >
                English
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
    
    
  );
}

export default HeaderManagementDoc;
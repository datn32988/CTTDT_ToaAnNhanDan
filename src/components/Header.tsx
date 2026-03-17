import Logo from "../assets/logo.png";  
import Home from "../assets/home.png";
import Grip from "../assets/grip.png";
import Search from "../assets/iconsearch.webp";
import { Link } from "react-router-dom";

function Header() {
    const menuItems = [
    {name :"GIỚI THIỆU", path:"/gioithieu"},
    {name :"HỘI ĐỒNG THẨM PHÁN", path:"/gioithieu"},
    {name :"CHÁNH ÁN", path:"/gioithieu"},
    {name :"HỆ THỐNG VĂN BẢN", path:"/gioithieu"},
    {name :"LIÊN HỆ",path:"/gioithieu"},
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
        <p className="text-blue-500 text-xl font-bold">Cổng thông tin điện tử</p>
        <h2 className="text-red-600 text-3xl font-bold">TOÀN ÁN NHÂN DÂN TỐI CAO</h2>
        <p className="text-gray-600 text-sm">THE SUPREME PEOPLE’S COURT OF THE SOCIALIST REPUBLIC OF VIETNAM</p>
      </div>
    </div>
    <div className="bg-red-600">
       <nav className="bg-red-600 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center  pl-[160px]">
            <li className="">
              <Link to="/">
                <img
                  src={Home}
                  alt="home"className="text-gray-700 hover:text-yellow-400 px-3 "
                />
              </Link>
              
             
            </li>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="text-white hover:text-yellow-400 font-medium text-lg tracking-wide transition-colors duration-200 border-r-2 border-white/30 p-3"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <a 
                href="#" 
                className="text-white hover:text-yellow-400 font-medium text-sm   transition-colors duration-200 "
              >
                English
              </a>
            </li>
            <li className="ml-6 flex items-center justify-center p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-sm hover:bg-white/30 transition-all cursor-pointer">
              <img src={Grip} alt="" className="size-7" />
            </li>

            <li className="ml-4 flex items-center justify-center p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-sm hover:bg-white/30 transition-all cursor-pointer gap-2">
              <img src={Search} alt="" className="size-7" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
    
    
  );
}

export default Header;
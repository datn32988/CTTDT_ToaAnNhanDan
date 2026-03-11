import Logo from "../assets/logo.png";  
import Home from "../assets/home.png";
import Grip from "../assets/grip.png";
import Search from "../assets/iconsearch.webp";

function Header() {
    const menuItems = [
    "GIỚI THIỆU",
    "HỘI ĐỒNG THẨM PHÁN",
    "CHÁNH ÁN",
    "HỆ THỐNG VĂN BẢN",
    "LIÊN HỆ"
  ];
  return (
  
    <div>
      <div className="flex items-center w-full p-4 bg-slate-50 px-4 ml-[160px]">
      <img
        src={Logo}
        alt="logo"
        className="h-40 w-auto object-contain" 
      />
      <div className="ml-4">
        <p className="text-blue-500 text-2xl font-bold">Cổng thông tin điện tử</p>
        <h2 className="text-red-600 text-5xl font-bold">TOÀN ÁN NHÂN DÂN TỐI CAO</h2>
        <p className="text-gray-600 text-xl">THE SUPREME PEOPLE’S COURT OF THE SOCIALIST REPUBLIC OF VIETNAM</p>
      </div>
    </div>
    <div className="bg-red-600">
       <nav className="bg-red-600 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center  py-2">
            <li className="">
              <img
                src={Home}
                alt="home"className="text-gray-700 hover:text-yellow-400 px-3 "
              />
             
            </li>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="text-white hover:text-yellow-400 font-medium text-xl tracking-wide transition-colors duration-200 border p-4"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="ml-auto">
              <a 
                href="#" 
                className="text-white hover:text-yellow-400 font-medium text-sm   transition-colors duration-200"
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
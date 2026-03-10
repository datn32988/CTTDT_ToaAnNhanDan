import Logo from "../assets/logo.png";  

function Header() {
  return (
   <div className="flex w-full h-20 bg-red-500">
    <img
      src={Logo}
      alt="banner"
      className="w-full has-[500px] object-cover"
    />
    <div>
    <div className="text-blue-500 text-2xl font-bold">
      <h1>Cổng thông tin điện tử </h1>
    </div>
    </div>
   </div>
  );
}

export default Header;
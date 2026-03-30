import NavItem from "./NavItem";


function CategoryDocument(){
    const menuData = [
        {
            title: "Cơ quan ban hành",
            children: [
            "Quốc hội",
            "Ủy ban thường vụ quốc hội",
            "Chính phủ",
            "Thủ tướng Chính phủ",
            "Các Bộ, cơ quan ngang Bộ",
            "TAND tối cao",
            "Các cơ quan khác"
            ]
        },
        {
            title: "Loại văn bản",
            children: ["Luật", "Nghị định", "Thông tư"]
        },
        {
            title: "Lĩnh vực",
            children: ["Giáo dục", "Y tế", "Công nghệ"]
        }
        ];


        return(
            <div className="">
                <div className="">
                    <span className="hover:text-red-400">Trang chủ <span className=" font-light"> / Văn bản</span> <span className="font-light"> / Văn bản pháp quy</span></span>
                </div>
                <div className=" mt-2 flex">
                  <div className="w-[308px]">
                        {menuData.map((item, index) => (
                            <NavItem
                            key={index}
                            title={item.title}  
                            childrenItems={item.children}
                            />
                        ))} 
                    </div>
                    <div className="w-full">
                        <h1></h1>
                    </div>
            </div>
            </div>
            
        );
}
export default CategoryDocument;
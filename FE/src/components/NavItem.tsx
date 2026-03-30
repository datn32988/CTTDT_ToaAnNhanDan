import { useState } from "react";
import image from "../assets/trongdong-big.png"
type Props = {
  title: string;
  childrenItems: string[];
};


function NavItem({title, childrenItems} : Props){
    const [isOpen, setOpen] = useState(false);
    
        return(
            <div className="border-x-2 border-b-2 border-red-500 mt-2">
                <div className="bg-red-500 text-white px-4 py-2 cursor-pointer border-l-8 border-red-700"
                    onClick={() =>setOpen(!isOpen)} >
                        <h1 className="text-xl text-yellow-400">{title}</h1>
                </div>
                <div
                 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"}`}
           style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
            {childrenItems.map((item, index) => (
            <div
                key={index}
                className="px-4 py-3 border-t hover:text-red-500 cursor-pointer"
                
            >
                {item}
            </div>
            ))}
        </div>
            </div>
        );

}

export default NavItem;
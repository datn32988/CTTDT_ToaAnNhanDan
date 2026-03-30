
import image from "../assets/trongdong-big.png"
import CategoryItem from "./CategoryItem"



type CategoryItemType = {
  id: number
  name?: string
}

type CategoryProps = {
  name: string
  items: CategoryItemType[];
  activeId?: number,
  onClickItem?: (id: number) => void;
}

function Category({ name, items,activeId, onClickItem }: CategoryProps) {

    return (
      <div className="text-white pt-2">
            <ul style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                <li className="bg-red-500 text-white p-3 text-xl border-l-8 border-red-700">
                    {name}
                </li>

                {items?.map((item)=>(
                    <CategoryItem 
                        key={item.id} 
                        id={item.id}
                        name={item.name || "" }
                        active={item.id === activeId}
                        onClickItem={onClickItem}
                    />    
                ))}
                  
            </ul>
        </div>
    );
}

export default Category
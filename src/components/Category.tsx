
import image from "../assets/trongdong-big.png"
import CategoryItem from "./CategoryItem"



type CategoryItemType = {
  id: string
  name: string
}

type CategoryProps = {
  name: string
  items: CategoryItemType[]
}

function Category({name,items} : CategoryProps) {

    return (
      <div className="text-white pt-2">
            <ul className="" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                <li className="bg-red-500 text-white p-3 text-xl border-l-8 border-red-700">
                    {name}
                </li>
                {items.map((item)=>(
                    <CategoryItem key={item.id} name={item.name}/>
                ))}
                  
            </ul>
        </div>
    );
}

export default Category
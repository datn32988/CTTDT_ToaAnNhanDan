type CategoryItemPros = {
    id: number;
    name: string;
    active?: boolean;
    onClickItem?: (id: number) => void;
}

function CategoryItem({ id, name,active, onClickItem }: CategoryItemPros){
    return(
        <li  
            onClick={() => onClickItem?.(id)}
            className={`py-4 px-4 cursor-pointer border-b border-x-2 border-red-500 text-black 
            ${active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
        >
            {name}
        </li>
    )
}

export default CategoryItem;
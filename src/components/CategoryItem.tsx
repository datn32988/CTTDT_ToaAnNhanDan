type CategoryItemPros = {
    name: string
}


function CategoryItem({name} : CategoryItemPros){
    return(
        <li  className="py-4 px-4 cursor-pointer border-b border-x-2 border-red-500 text-black hover:bg-gray-100 transition-colors">
            {name}
        </li>
    )
}

export default CategoryItem;
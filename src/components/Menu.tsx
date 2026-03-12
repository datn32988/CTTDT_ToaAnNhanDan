


interface MenuItem{
    id: number,
    title: string
}
function Menu() {
    const menuPost: MenuItem[]=[
        {id: 1, title: "Lịch sử phát triển"},
        {id: 2, title: "Kỉ yếu toàn án"},
        {id: 3, title: "Cơ cấu tổ chức của TAND"},
        {id: 4, title: "Lãnh đạo TAND tối cao"},
        {id: 5, title: "Hội đồng thẩm phán TAND tối cao"},
        {id: 6, title: "Lãnh đạo đảng và nhà nước"}
    ]
    return (
        <div className=" text-white">
             <ul>
                {menuPost.map((item) => (
                <li
                    key={item.id}
                    className="py-2 px-3 bg-red-500 cursor-pointer border-b border-white"
                >
                    {item.title}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu
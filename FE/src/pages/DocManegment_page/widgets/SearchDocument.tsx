
function SearchDocument(){
    return(
        <div className="bg-yellow-100  ">
            <div className="px-4"> 
                <h2 className="py-4 text-2xl text-red-500 border-b-2 border-red-500">Thông báo điều hành chỉ đạo</h2>
            </div>
            <div className="grid grid-cols-4">
                <div className="col-span-1 pl-4">
                    <h1 className="text-black font-bold text-lg ">Từ khóa </h1>
                    <h1 className="text-black font-bold text-lg py-5">Loại văn bản</h1>
                    <h1 className="text-black font-bold text-lg">Ngày ban hành</h1>
                </div>
                <div className="col-span-3 ">
                    <form action="">
                        <input type="text " placeholder="Nhập từ khóa tìm kiếm ..." className="w-full py-2 px-4 "/>
                        <input type="text" name="" id="" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchDocument;
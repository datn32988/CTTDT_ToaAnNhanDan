type ArticleItemSpecial = {
    nameCategory: string,
    image: string,
    title: string, 
    date: Date,
    decscripsion: string
}

 function ArticleItemSpecial({image, title, date,decscripsion,nameCategory} : ArticleItemSpecial){
    return (
        <div>
             <div className="pl-5">
                         <div className=" pt-4 mb-3 pb-1 ">
                            <a href="" className="hover:text-red-500">Trang chủ / Tin xét sử  <span>/ {nameCategory}</span> </a> 
                        </div>
                    </div>
             <div className="grid grid-cols-2 ml-4 gap-6 border-b-2 border-gray-300">
           
            <div className="col-span-1">
                <img src={image} alt="" className="w-full h-[225px] object-cover" />
            </div>
            <div className="col-span-1">
                <h1 className="text-2xl font-bold hover:text-red-500">{title} <span className="text-sm text-gray-400">({date.toLocaleDateString()})</span></h1>

                <p className="mt-4 mb-4">{decscripsion}</p>
            </div>
        </div>
        </div>
       
    );
 }

 export default ArticleItemSpecial;
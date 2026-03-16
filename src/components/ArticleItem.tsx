type ArticleItem = {
    image: string,
    title: string,
    date: Date,
    decscription: string
}

function ArticleItem({image, title,date,decscription} : ArticleItem){
    return(
        <div className="grid grid-cols-3 border-b-2 border-gray-300 gap-8 my-4 ml-4">
            <div className="col-span-1"><img src={image} className="w-full object-cover pb-4 " alt="" /></div>
            <div className="col-span-2">
                <h1 className="text-black hover:text-red-500 text-xl font-bold">{title} <span className=" text-gray-300 text-sm ">({date.toLocaleDateString()})</span></h1>
                <p className="text-sm pt-5">{decscription}</p>
            
            </div>
        </div>
    );
}


export default ArticleItem;
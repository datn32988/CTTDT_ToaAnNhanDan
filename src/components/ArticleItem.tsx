import { Link } from "react-router-dom";

type ArticleItem = {
    id: number
    image: string,
    title: string,
    date: Date,
    decscription: string
}

function ArticleItem({id,image, title,date,decscription} : ArticleItem){
    return(

        <div className="grid grid-cols-3 border-b-2 border-gray-300 gap-8 my-4 ml-4 pb-4">
            <Link to={`/chitiettin/${id}`}>
            <div className="col-span-1"><img src={image} className="w-full object-cover pb-4 " alt="" /></div>
            </Link>
            <div className="col-span-2">
                  <Link to={`/chitiettin/${id}`}><h1 className="text-black hover:text-red-500 text-lg font-bold">{title} <span className=" text-gray-300 text-sm ">({date.toLocaleDateString()})</span></h1></Link>
                <p className="text-sm pt-5">{decscription}</p>
            </div>
        </div>
    );
}


export default ArticleItem;
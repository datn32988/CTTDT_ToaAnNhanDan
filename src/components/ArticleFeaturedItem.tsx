import { Link } from "react-router-dom";


type ArticleFeaturedItem = {
    id: number
    title: string
    date : string
}

function ArticleFeaturedItem({id,title, date}: ArticleFeaturedItem){
    return(
        <div className=" pl-3 mb-5 p-2">
          <Link key={id} to={`/chitiettin/${id}`}>
            <h1 className="text-sm hover:text-red-500 cursor-pointer">
              <span className="text-red-500">• </span>{title}
              <span className="text-gray-400 ml-2">
                ({date})
              </span>
            </h1>
        </Link>
    </div>
    );
}

export default ArticleFeaturedItem;
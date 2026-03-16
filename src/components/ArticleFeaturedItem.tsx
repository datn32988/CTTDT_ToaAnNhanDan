

type ArticleFeaturedItem = {
    title: string
    date : Date
}

function ArticleFeaturedItem({title, date}: ArticleFeaturedItem){
    return(
        <div className=" pl-3 mb-5">
      <h1 className="text-lg hover:text-red-500 cursor-pointer">
        <span className="text-red-500">• </span>{title}
        <span className="text-gray-400 ml-2">
          ({date.toLocaleDateString()})
        </span>
      </h1>
    </div>
    );
}

export default ArticleFeaturedItem;
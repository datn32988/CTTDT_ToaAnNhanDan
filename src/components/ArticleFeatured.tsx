type ArticleFeatured = {
  image: string
  title: string
  date: Date
  description: string
};

function ArticleFeatured({ image, title, date, description }: ArticleFeatured) {
  return (
    <div>
      <h2 className="text-xl text-black hover:text-red-500 cursor-pointer">
        {title}
        <span className="text-sm text-gray-400 ml-2">
          ({date.toLocaleDateString()})
        </span>
      </h2>

      <div className="text-gray-500 leading-relaxed text-justify mt-2">

        <img
          src={image}
          alt={title}
          className="w-[194px] h-[130px] object-cover float-left mr-4 mb-2"
        />

        {description}

      </div>
    </div>
  );
}

export default ArticleFeatured;
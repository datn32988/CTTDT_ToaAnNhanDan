

type Props ={
    image: string,
    title: string,
    date: Date,
    content: string

}

function PostImageFirst({image, title,date,content} : Props){
    return(
        <div className="w-[1100px] border-b-2 border-gray-400 ">
            <h1 className=" ">Trang chủ <span className="font-light ">/ Tin ảnh </span></h1>
            <div className="border-b-2 border-red-500  bg-gray-200 my-4">
                <h1 className="text-red-500 text-xl py-2 pl-2 ">TIN ẢNH</h1>
            </div>
            <div className=" flex gap-2 my-3">
                <div className="w-[362px] h-[215px] flex-shrink-0 overflow-hidden">
                    <img src={image} alt=""  className="w-full h-full object-cover "/>
                </div>
                <div className="pl-3">
                    <h1 className="text-black text-2xl hover:text-red-500">
                        {title} <span className="text-gray-400 text-lg">{date.toString()}</span>
                    </h1>
                    <p className="text-xl text-black">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default PostImageFirst;
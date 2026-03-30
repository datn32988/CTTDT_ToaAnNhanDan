
type MainCase = {
    image: string,
    title: string,
    date: Date,
    description: string
};

function MainCase({image, title, date, description} : MainCase){
    return(
        <div>
            <img src={image} alt=""  className=" w-full"/>
            
            <h2 className="text-2xl text-black mt-2 hover:text-red-400">{title} <span className="text-sm font-light">({date.toLocaleDateString()})</span></h2>
            <p className="mt-2">{description}</p>
        </div>
    );
}

export default MainCase;
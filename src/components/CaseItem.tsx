type CaseItemProps  = {
    image: string,
    title: string
}

function CaseItem({image,title} : CaseItemProps ){
    return(

        <div className=" flex gap-2 mb-4">
            <img src={image} alt="" className="w-24 h-16 object-cover" />

            <p className="text-sm text-black hover:text-red-400">{title}</p>
        </div>
    );
}

export default CaseItem;
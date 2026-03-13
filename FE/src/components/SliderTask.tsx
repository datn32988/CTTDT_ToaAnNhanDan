

function SlderTask() {
    const posts = [
        { id: 1, task: "Lao động", number: "9.643" },
        { id: 2, task: "Quyết định tuyên bố tài sản", number: "9.643" },
        { id: 3, task: "Hình sự", number: "392.122" },
        { id: 4, task: "Dân sự", number: "406.994" },
        { id: 5, task: "Hôn nhân gia đình", number: "967.579" },
        { id: 6, task: "Hành chính", number: "24.851" },
        { id: 7, task: "Kinh doanh thương mại", number: "35.877" },
    ];

  
    const doubledPosts = [...posts, ...posts];

    return (
        <div className="flex items-center bg-gray-100 h-10 w-full overflow-hidden  border-b border-red-500">
            
            <div className="text-white bg-red-500 font-bold whitespace-nowrap p-20  z-10 py-2  uppercase text-xl">
                Tổng số bản án Quyết định được công bố: 1.975.988
            </div>

            
            <div className="relative flex-1 h-full overflow-hidden">
                <div className="flex flex-col animate-slide-up">
                    {doubledPosts.map((item, index) => (
                        <div 
                            key={index} 
                            className="h-10 flex items-center text-sm space-x-1 whitespace-nowrap "
                        >
                            <span className="text-gray-700">{item.task}</span>
                            <span className="text-red-600 font-bold">({item.number})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SlderTask;
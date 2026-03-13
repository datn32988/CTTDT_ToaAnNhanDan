import { useState, useEffect } from "react";
import banner1 from "../assets/bn565_1_1528336294950.png";
import banner2 from "../assets/bn565_2_1528336723310.png";
interface PostItem {
    id: string;
    imageUrl?: string;
    title: string;
    description?: string;
    date: Date;
}

function TrialNew() {
    const [posts, setPosts] = useState<PostItem[]>([]);
      useEffect(() => {
            const fakeData: PostItem[] = [
            { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 10 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2024-01-15"), description: "Phiên họp sẽ diễn ra vào ngày 15 tháng 1 năm 2024 tại trụ sở Tòa án nhân dân tối cao. Phiên họp sẽ diễn ra vào ngày 15 tháng 1 năm 2024 tại trụ sở Tòa án nhân dân tối cao.", imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "45/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 9 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-12-20"), description: "Phiên họp sẽ diễn ra vào ngày 20 tháng 12 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "46/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 8 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-11-10"), description: "Phiên họp sẽ diễn ra vào ngày 10 tháng 11 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "47/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 7 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-10-05"), description: "Phiên họp sẽ diễn ra vào ngày 5 tháng 10 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" },
            { id: "48/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 6 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-09-15"), description: "Phiên họp sẽ diễn ra vào ngày 15 tháng 9 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" }
            ];
    
            setPosts(fakeData);
    
        }, []);

        const latestPost = posts[0];          
        const gridPosts = posts.slice(1, 5);   
        const listPosts = posts.slice(2,5);
        

    return (
        <div className="ml-[160px] mr-[127px]">
             <div className=" mt-4 flex">
                <h1 className="bg-red-500 text-2xl text-white font-bold px-6 py-3 inline-block">Tin xét xử</h1>
            </div>

            <div className="border-t-2 border-t-red-500 w-full h-[500px] border-x-2 border-gray-50">
                <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="col-span-2 p-1  ">
                        {latestPost && (
                        <>
                            <img src={latestPost.imageUrl || "/placeholder-big.jpg"} className="w-full h-auto object-cover" alt="" />
                            <h2 className="text-2xl font-bold leading-tight hover:text-red-600 cursor-pointer">
                                {latestPost.title} <span className="font-light text-lg">
                                    ({latestPost.date.toLocaleDateString()})
                                </span>
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                {latestPost.description}
                            </p>
                        </>
                    )}    
                    </div>
                    <div className="col-span-3 p-4">
                        <div className="grid grid-cols-4 gap-4">
                        {gridPosts.map((post) => (
                            <div key={post.id} className="group cursor-pointer">
                                <img src={post.imageUrl || "/placeholder-small.jpg"} className="w-full h-24 object-cover mb-2" alt="" />
                                <h3 className="text-[13px] font-semibold leading-snug group-hover:text-red-600 line-clamp-3">
                                    {post.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                        <div className="border-t border-gray-200 pt-4 flex flex-col gap-3 p-4 m-3">
                        {listPosts.map((post) => (
                            <div key={post.id} className="flex items-start gap-2 group cursor-pointer">
                                <span className="text-red-600 mt-1.5">•</span>
                                <div className="flex flex-col">
                                    <h4 className="text-[15px] font-medium group-hover:text-red-600">
                                        {post.title} 
                                        <span className="text-gray-400 text-xs ml-2 font-normal">
                                            ({post.date.toLocaleDateString('vi-VN')})
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex justify-between  py-4">
                  <img src={banner1} alt="" />      
                  <img src={banner2} alt="" />    
            </div>
        </div>
    );
}   

export default TrialNew;
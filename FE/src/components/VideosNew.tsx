import { useEffect, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
interface PostItem {
    id: string;
    title: string;
    date: Date;
    videoUrl?: string;
    description?: string;
}
function VideosNew() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    useEffect(() => {
        const fakeData: PostItem[] = [
            { id: "44/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 10 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2024-01-15"), description: "Phiên họp sẽ diễn ra vào ngày 15 tháng 1 năm 2024 tại trụ sở Tòa án nhân dân tối cao.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { id: "45/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 9 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-12-20"), description: "Phiên họp sẽ diễn ra vào ngày 20 tháng 12 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { id: "46/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 8 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-11-10"), description: "Phiên họp sẽ diễn ra vào ngày 10 tháng 11 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { id: "47/TANDTC-KHTC", title: "Thông báo về việc tổ chức phiên họp thứ 7 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-10-05"), description: "Phiên họp sẽ diễn ra vào ngày 5 tháng 10 năm 2023 tại trụ sở Tòa án nhân dân tối cao.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
            
        ];
        setPosts(fakeData);
    }, []);
    if (posts.length === 0) return <div className="ml-[160px]">Đang tải...</div>;
    const latestPost = posts[0];          
    const gridPosts = posts.slice(1, 4);   

    return (
        <div className="ml-[160px] mr-[127px] font-sans">
            <div className="mt-4 flex items-center border-b-2 border-red-500 pb-2"> 
                <div className="text-red-600 text-3xl"><IoVideocam /></div>
                <h1 className="text-xl text-red-500 font-bold ml-4 uppercase">
                    Video - Phóng sự hoạt động của tòa án
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4 border p-4 shadow-sm">
                <div className="col-span-1">
                    {latestPost && (
                        <div className="flex flex-col gap-3">
                            <div className="aspect-video w-full">
                                <iframe 
                                    src={latestPost.videoUrl} 
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={latestPost.title}
                                />
                            </div>
                           
                        </div>
                    )}
                </div>

               
                <div className="col-span-1 flex flex-col">
                    <div className="py-4">
                        <h2 className="text-xl font-bold hover:text-red-600 cursor-pointer">
                                {latestPost.title}
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                {latestPost.description}
                            </p>
                        
                    </div>
                     <div className="flex space-x-2  py-5">
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                                <CiFacebook />
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-600">
                                <CiTwitter />
                            </a>
                            <a href="#" className="text-red-500 hover:text-red-700">
                                <CgMail />
                            </a>
                        </div>
                    <div className="grid grid-cols-3 gap-3">
                        {gridPosts.map((post) => (
                            <div key={post.id} className="flex flex-col gap-2">
                                <div className="aspect-video w-full">
                                    <iframe 
                                        src={post.videoUrl} 
                                        className="w-full h-full"
                                        title={post.title}
                                    />
                                </div>
                                <h3 className="text-[12px] font-semibold leading-tight line-clamp-3 hover:text-red-600 cursor-pointer">
                                    {post.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideosNew;
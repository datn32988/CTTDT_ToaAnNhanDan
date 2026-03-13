
import { useEffect, useState } from 'react';
interface PostItem{
    id: string;
    code: string;
    title: string;
    date: Date;
}
function DocManagement() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    useEffect(() => {  const fakeData: PostItem[] = [
            { id: "1", code: "44/TANDTC-KHTC", title: "Dự thảo Nghị quyết về việc hướng dẫn áp dụng một số quy định của Bộ luật Tố tụng Hình sự năm 2015", date: new Date("2024-01-15") },
            { id: "2", code: "45/TANDTC-KHTC", title: "Dự thảo Nghị quyết về việc hướng dẫn áp dụng một số quy định của Bộ luật Tố tụng Dân sự năm 2015", date: new Date("2023-12-20") },
            { id: "3", code: "46/TANDTC-KHTC", title: "Dự thảo Nghị quyết về việc hướng dẫn áp dụng một số quy định của Bộ luật Tố tụng Hành chính năm 2015", date: new Date("2023-11-10") },
            { id: "4", code: "47/TANDTC-KHTC", title: "Dự thảo Nghị quyết về việc hướng dẫn áp dụng một số quy định của Bộ luật Tố tụng Lao động năm 2012", date: new Date("2023-10-05") },
            { id: "5", code: "48/TANDTC-KHTC", title: "Dự thảo Nghị quyết về việc hướng dẫn áp dụng một số quy định của Bộ luật Tố tụng Hình sự năm 2015", date: new Date("2023-09-15") }
        ];
        setPosts(fakeData);
    }, []);
    if(posts === null || posts.length === 0) {
        return <div className="ml-[160px] mr-[127px] mt-5">Không có dữ liệu</div>;
    }
    const latestPost = posts[0];  

    return (
        <div className="ml-[160px] mr-[127px] grid grid-cols-2 gap-4 mt-5">
            <div className="bg-white border border-gray-300 ">
                <div className="w-full bg-red-500 text-white ">
                    <h1 className="text-2xl font-bold px-6 py-3 inline-block">GÓP Ý DỰ THẢO VĂN BẢN</h1>
                </div>
                <div className="border-t-2 border-t-red-500 w-full h-[550px] border-x-2 border-white">
                    <div className=''>
                        {latestPost && (
                            <div className="p-4">
                                <h2 className="text-xl font-bold hover:text-red-500">{latestPost.title}</h2>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        {posts.map((post) => (
                            <div key={post.id} className="p-4 hover:text-red-500 cursor-pointer">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="bg-white border border-gray-300">
                  <div className="w-full bg-red-500 text-white ">
                    <h1 className="text-2xl font-bold px-6 py-3 inline-block">VĂN BẢN QUY PHẠM PHÁP LUẬT MỚI</h1>
                </div>
                 <div className=''>
                        {latestPost && (
                            <div className="p-4">
                                <h2 className="text-xl font-bold hover:text-red-500"><span className='text-red-500'>{latestPost.code}</span> {latestPost.title} <span className='text-gray-500 text-sm '>({latestPost.date.toLocaleDateString()})</span></h2>
                            </div>
                        )}
                    </div>
                <div className=''>
                      {posts.map((post) => (
                            <div key={post.id} className="p-4 hover:text-red-500 cursor-pointer">
                             <h2 className="text-sm font-bold hover:text-red-500"><span className='text-red-500'>{latestPost.code}</span> {latestPost.title} <span className='text-gray-500 text-sm '>({latestPost.date.toLocaleDateString()})</span></h2>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default DocManagement;
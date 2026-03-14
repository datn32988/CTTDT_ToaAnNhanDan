import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import Notification from "../../components/Notification";
import VerticalBanner from "../../components/VerticalBanner";
import type { Post } from "../../types/Post.type";
import { Link } from "react-router-dom"
import Category from "../../components/Catecory";
import { postService } from "../../services/postService";

function ListPostPage(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BASE_URL = "https://localhost:7212";
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await postService.getPosts(1, 1);
                setPosts(data.items);
            } catch (error) {
                console.error("Lỗi fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const  postByIdCategory = posts.filter(
        posts => posts.idCategory === 1
    )
    const mainPost = postByIdCategory[0]

    const sidePosts = postByIdCategory.slice(1,4)

   if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    return(
        <div className="overflow-x-hidden">
            <Header/>
                <Notification/>
            <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">
                  <div className="col-span-1 w-full">
                    
                    <Category />
                    <VerticalBanner/>
                </div>
                <div className="col-span-3 bg-white ml-4  ">
                    <div className="pl-5">
                         <div className=" pt-4 mb-3 pb-1 ">
                            <a href="" className="hover:text-red-500">Trang chủ <span>/ Tin hoạt động</span> </a> 
                        </div>
                    </div>

                    <div className=" w-full py-2 bg-red-500 pl-4 border-l-8 border-red-800  ">
                        <h1 className="text-xl text-white">TIN HOẠT ĐỘNG TÒA ÁN NHÂN DÂN TỐI CAO</h1>

                        
                    </div>
                    <div className="grid grid-cols-2 border-2 border-gray-200 gap-4">
                        <div className="col-span-1 p-2">
                            
                            {mainPost && (
                                <Link to={`/chitiettin/${mainPost.id}`}>
                                    <>
                                        <img src={ `${BASE_URL}/${mainPost.image}` || "/placeholder-big.jpg"} className="w-full h-auto object-cover" alt="" />
                                        <h2 className="text-lg font-bold text-back hover:text-red-500">{mainPost.title} <span className="text-sm  pl-2">({new Date(mainPost.date).toLocaleDateString("vi-VN")})</span></h2>
                                        <h2 className="text-sm ">{mainPost.title}</h2>
                                    </>
                                </Link>
                            )}                     
                        </div>
                        <div className="col-span-1">
                            {sidePosts.map((post) => (
                                <Link to={`/chitiettin/${post.id}`}>
                                    <div key={post.id} className="">
                                        <div className="flex p-4">
                                            <img src={`${BASE_URL}/${post.image}`} alt="" className="w-[200px] " />
                                            <h2 className="text-black ml-2 text-sm hover:text-red-500">{post.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                                

                            ))}

                        </div>
                    </div>


                </div>
            </div>
            <Footer/>
        </div>
    );

}
export default ListPostPage
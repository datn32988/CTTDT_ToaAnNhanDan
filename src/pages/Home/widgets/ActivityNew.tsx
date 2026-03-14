import image5 from "../../../assets/Thong_tin_tuyen_dung_nam_2025_1759489465871.jpg";
import image6 from "../../../assets/e0af0872d356be51779bfe9875b978ba.jpg";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import image7 from "../../../assets/bg-tle.png";
import { useEffect, useState } from "react";
import type { Post } from "../../../types/Post.type";
import { postService } from "../../../services/postService";
import { Link } from "react-router-dom";
function ActivityNew() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BASE_URL = "https://localhost:7212";
    useEffect(() => {

        const loadData = async () => { 
        try {
            setLoading(true);
            const data = await postService.getPosts(1,1);
            setPosts(data.items);
        } catch (error) {
            console.error("Lỗi fetch api" ,error)
        } finally{
            setLoading(false);
        }
    }
    loadData();
       
    },[]);
    const postsByIdCatecory = posts.filter(
        posts => posts.idCategory ===1
    );
    const mainPost = postsByIdCatecory[0];
    const sidePost = postsByIdCatecory.slice(1,4)
    if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    return(
        <div className="bg-gray-100 min-h-screen ml-[160px] mr-[127px] mt-10 mb-10   gap-10">
            <div>
                <img src={image5} alt="" className="w-full h-[100px] " />
            </div>
            <Link to={"/danhsachbangtin"}>
                <div className=" mt-4 flex border-l-8 border-red-700">
                    <h1 className="bg-red-500 text-2xl text-white font-bold px-6  inline-block">TIN HOẠT ĐỘNG</h1>
                    <img src={image7} alt="" className="border-r-2 border-red-400" />
                </div>
            </Link>
            
            <div className="bg-white w-full h-[500px] border-t-2 border-t-red-500">
               <div className="grid grid-cols-2 gap-4 p-4">
                {mainPost &&( 
                    <Link to={`/chitiettin/${mainPost.id}`}>
                        <img src={ `${BASE_URL}/${mainPost.image}`} className="w-full h-[360px] object-cover"
                           
                        />
                    </Link>
                )}
                   
                    <div>
                        {mainPost && (
                            <Link to={`/chitiettin/${mainPost.id}`}>
                             <h2 className="text-2xl font-semibold mb-3">
                            {mainPost.title}
                        </h2>

                        <p className="text-gray-600">
                            {mainPost.title}
                        </p> 
                            
                            </Link>
                        )}
                       
                        <div className="flex space-x-2  pt-4">
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
                         <div className="grid grid-cols-3 gap-4 mt-6">
                            {sidePost.map((post) => (
                                <Link to={`/chitiettin/${mainPost.id}`}>
                                    <div key={post.id}><img src={`${BASE_URL}/${mainPost.image}`} alt="" />
                                        <p>{post.title}</p>
                                    </div>
                                </Link>
                                

                            ))}
                           
                         </div>
                    </div>
                </div>
            </div>

        </div>
        
    );
}

export default ActivityNew;
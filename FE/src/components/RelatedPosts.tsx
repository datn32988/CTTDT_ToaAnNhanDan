import { useEffect, useState } from "react";
import type { PostListItem } from "../types/Post.type";
import { postService } from "../services/postService";

interface Props{
    postId:Number;
}
function RelatedPosts({postId} : Props){

    const[posts, setPosts] = useState<PostListItem[]>([]);
    const[loading, setLoading] = useState<boolean>(true)

    useEffect(() =>{
        const loadData = async () =>{
            try{
                setLoading(true);
                const dataPost =  await postService.getPostsByCategory(Number(postId), 1)
                setPosts(dataPost.items);

            }catch (error){
                console.error("Error loading posts:", error);
            }finally{
                setLoading(false);
            }
        }
        loadData();
    },[postId])
     if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    return(
        <div>
            <div>
                <h1 className="text-2xl text-red-500 py-4 ">Các bảng tin</h1>
            </div>
            {posts.map((post) => (
                <div className="py-2">
                    <h1 className="text-sm text-black hover:text-red-500"> ● {post.title} <span className="text-sm text-gray-500 ">{post.createdAt}</span></h1>
                </div>
            ))}
        </div>
    );
}

export default RelatedPosts;
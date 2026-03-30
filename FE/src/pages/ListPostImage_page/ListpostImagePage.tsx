import { Link, useNavigate, useParams } from "react-router-dom"; // Nhớ import useParams nếu dùng id từ URL
import PostImageFirst from "../../components/PostImageFirst";
import PostImageNew from "../../components/PostImageNew";
import PostArticleLayout from "../../layouts/PostArticleLayout";
import { useEffect, useState } from "react";
import type { PostListItem } from "../../types/Post.type";
import { postService } from "../../services/postService";

function ListPostImagePage() {
    const navigate = useNavigate();; 
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BASE_URL = "https://localhost:7212";

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
          
                const dataPost = await postService.getPostByRootCategory(3, 1);
                setPosts(dataPost.items);
            } catch (error) {
                console.error("Lỗi fetch:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 font-bold">Đang tải dữ liệu...</div>;
    }


    const [firstPost, ...remainingPosts] = posts;

    return (
        <PostArticleLayout>
            <div className="ml-[160px] mr-[127px] mt-3">
                
              
                {firstPost ? (
                    <Link to={`/thuvienanh/${firstPost.id}`}>
                    <PostImageFirst 
                        image={firstPost.thumbnailUrl ? `${BASE_URL}${firstPost.thumbnailUrl}` : "https://via.placeholder.com/800x400"} 
                        title={firstPost.title}
                        date={new Date(firstPost.createdAt)} 
                        content={firstPost.title || firstPost.title}
                    /></Link>
                ) : (
                    <div className="text-gray-500">Chưa có bài viết nào.</div>
                )}

            
                <div className="grid grid-cols-3 gap-6 py-8 w-[1100px]">
                    {remainingPosts.map((post) => (
                        <div key={post.id} className="col-span-1">
                            <Link to={`/thuvienanh/${post.id}`}>
                            <PostImageNew 
                                image={post.thumbnailUrl ? `${BASE_URL}${post.thumbnailUrl}` : "https://via.placeholder.com/400x250"}
                                date={new Date(post.createdAt)} 
                                title={post.title}
                            /></Link>
                        </div>
                    ))}
                </div>
                
            </div>
        </PostArticleLayout>
    );
}

export default ListPostImagePage;
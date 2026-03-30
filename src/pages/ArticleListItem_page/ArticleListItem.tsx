import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import ArticleItem from "../../components/ArticleItem";
import Category from "../../components/Category";
import VerticalBanner from "../../components/VerticalBanner";
import PostArticleLayout from "../../layouts/PostArticleLayout";
import ArticleItemSpecial from "./widgets/ArticleItemspecial";

import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";

import type { CategoryResponse } from "../../types/category.type";
import type { PostListItem } from "../../types/Post.type";

function ArticleListItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const BASE_URL = "https://localhost:7212";
    const getRootId = (id: number) => {
            if ([8,9,10,11,12,13,14].includes(id)) return 1;
            if ([15,16,17].includes(id)) return 2;
            return 1;
        };
    const rootId = getRootId(Number(id));
     const getCategoryName = (rootId ?: number) => {
        switch (rootId) {
            case 1:
                return "TIN HOẠT ĐỘNG";
            case 2:
                return "TIN XÉT XỬ";
            default:
                return "DANH MỤC";
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategoriesApi(rootId);
                setCategories(res);
                if (!id && res.length > 0) {
                    navigate(`/posts/category/${res[0].id}`);
                }
            } catch (err: any) {
                if (err.code !== "ERR_CANCELED") {
                    console.error("Lỗi load categories:", err);
                }
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const fetchPosts = async () => {
            try {
                setLoading(true);

                const res = await postService.getPostsByCategory(Number(id), 1);

                if (!isMounted) return;

                setPosts(res.items);
            } catch (err: any) {
                if (err.code !== "ERR_CANCELED") {
                    console.error("Lỗi load posts:", err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, [id]);


    const getThumbnail = (url?: string | null) =>
        url ? `${BASE_URL}${url}` : "/images/placeholder.jpg";

    const mainPost = posts[0];
    const otherPosts = posts.slice(1);

    if (loading) {
        return <div className="text-center mt-10">Đang tải...</div>;
    }

    return (
        <PostArticleLayout>
            <div className="grid grid-cols-4 bg-white ml-[160px] mr-[127px] mb-10 pt-2">

                <div className="col-span-1">
                    <Category
                        name={getCategoryName(rootId)}
                        items={categories}
                        activeId={Number(id)} 
                        onClickItem={(categoryId) =>
                            navigate(`/posts/category/${categoryId}`)
                        }
                    />
                    <VerticalBanner />
                </div>

      
                <div className="col-span-3 ml-4">

           
                    {mainPost && (
                        <div className="mb-6">
                            <Link to={`/chitiettin/${mainPost.id}`}>
                            <ArticleItemSpecial
                                image={getThumbnail(mainPost.thumbnailUrl)}
                                title={mainPost.title}
                                date={new Date(mainPost.createdAt)}
                                decscripsion={mainPost.title}
                                nameCategory="TIN HOẠT ĐỘNG"
                            />
                            </Link>
                        </div>
                    )}
                    {otherPosts.map((item) => (
                        <ArticleItem
                            key={item.id}
                            image={getThumbnail(item.thumbnailUrl)}
                            date={new Date(item.createdAt)}
                            title={item.title}
                            decscription={item.title} id={item.id}                        />
                    ))}

                </div>
            </div>
        </PostArticleLayout>
    );
}

export default ArticleListItem;
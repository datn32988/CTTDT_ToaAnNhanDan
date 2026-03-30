import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import VerticalBanner from "../../components/VerticalBanner";


import { getCategoriesApi } from "../../services/categoryService";
import { postService } from "../../services/postService";

import type { CategoryResponse } from "../../types/category.type";
import type { PostListItem } from "../../types/Post.type";
import PostSectionFeatured from "../../components/PostSectionFeatured";
import PostSectionList from "../../components/PostSectionList";

function ListPostByRootCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const BASE_URL = "https://localhost:7212";

    const getCategoryName = (id?: string) => {
        switch (Number(id)) {
            case 1:
                return "TIN HOẠT ĐỘNG";
            case 2:
                return "TIN XÉT XỬ";
            default:
                return "DANH MỤC";
        }
    };
    const categoryTitleMap: Record<number, string> = {
        11: "Hợp tác quốc tế",
        12: "Thi đua khen thưởng",
        8: "Tin hoạt động TAND Tối cao",
        9: "Tin hoạt động của hệ thống TAND",
        14: "Tin hoạt động từ Báo Công lý",
        13: "Tin hoạt động từ Học viện Tòa án",
        10: "Tổ chức cán bộ",
        2: "Các vụ án lớn",
        16: "Tổ Thẩm phán và HĐTP TANDTC",
        17: "Tòa án địa phương"

        
    };
    const getCategoryTitle = (categoryId: number) => {
        return categoryTitleMap[categoryId] || "Danh mục khác";
    };
    useEffect(() => {
        if (!id) return;

        const loadData = async () => {
            try {
                setLoading(true);
                const dataPost = await postService.getPostByRootCategory(Number(id), 1);
                setPosts(dataPost.items);
                console.log(dataPost)
                const dataCategory = await getCategoriesApi(Number(id));
                setCategories(dataCategory);
                

            } catch (error) {
                console.error("Lỗi fetch:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Đang tải...</div>;
    }
    const groupPostsByCategory = (posts: PostListItem[]) => {
    return posts.reduce((acc, post) => {
            const key = post.categoryId;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(post);
            return acc;
        }, {} as Record<number, PostListItem[]>);
    };
    const mainPost = posts[0];

    const activeChildId = mainPost?.categoryId;
    const groupedPosts = groupPostsByCategory(posts);
    return (
        <div className="overflow-x-hidden">
            <Header />
            <Notification />

            <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">

              
                <div className="col-span-1 w-full">
                    <Category
                        name={getCategoryName(id)}
                        items={categories}
                        activeId={activeChildId}
                        onClickItem={(categoryId) =>
                            navigate(`/posts/category/${categoryId}`)
                        }
                    />
                    <VerticalBanner />
                </div>

            
                <div className="col-span-3 bg-white ml-4">
                    <div className="pl-5">

                        <div className="pt-4 mb-3 pb-1">
                            <span className="text-gray-500">
                                Trang chủ / {getCategoryName(id)}
                            </span>
                        </div>
                        {Object.entries(groupedPosts).map(([categoryId, items]) => {
                            const id = Number(categoryId);
                             if (id === 13) {
                                return (
                                    <PostSectionFeatured
                                        key={id}
                                        posts={items}
                                        baseUrl={BASE_URL}
                                        title={getCategoryTitle(id)}
                                    />
                                );
                            }
                            return (
                                <PostSectionList
                                    key={id}
                                    title={getCategoryTitle(id)}
                                    posts={items}
                                    baseUrl={BASE_URL}
                                />
                            );
                        })}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default ListPostByRootCategory;
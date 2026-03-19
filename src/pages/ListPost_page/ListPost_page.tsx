import { useEffect, useState } from "react";
import type { PostListItem } from "../../types/Post.type";
import type { CategoryResponse } from "../../types/category.type";
import { postService } from "../../services/postService";
import PostSectionList from "../../components/PostSectionList";
import PostSectionFeatured from "../../components/PostSectionFeatured";
import Category from "../../components/Category";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import VerticalBanner from "../../components/VerticalBanner";
import { getCategoriesApi } from "../../services/categoryService";
import Footer from "../../components/Footer";

function ListPostPage() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [postActive, setPostActive] = useState<PostListItem[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://localhost:7212";

  useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      const data = await postService.getPostByRootCategory(1, 1);

      console.log("API DATA:", data);

      // Simplified mergedPosts assignment to avoid let and multiple assignments
      const mergedPosts: PostListItem[] = (Array.isArray(data)
        ? data.flatMap((x: any) => x.posts || [])
        : (data as any)?.items || (data as any)?.data || []) as PostListItem[];

      setPosts(mergedPosts);
      setPostActive(mergedPosts);

      const dataCategory = await getCategoriesApi(1);
      setCategories(dataCategory);

    } catch (err) {
      console.error("Lỗi loadData:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Notification />

      <div className="grid grid-cols-4">

        <div>
          <Category items={categories} name={""} />
          <VerticalBanner />
        </div>

        <div className="col-span-3">
       
          <PostSectionFeatured posts={posts} baseUrl={BASE_URL} />

          <PostSectionList
            title="Tin tức hệ thống TAND"
            posts={postActive}
            baseUrl={BASE_URL}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ListPostPage;
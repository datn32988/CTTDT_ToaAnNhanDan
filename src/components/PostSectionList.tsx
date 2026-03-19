import { Link } from "react-router-dom";
import type { PostListItem } from "../types/Post.type";
import ArticleFeatured from "./ArticleFeatured";
import ArticleFeaturedItem from "./ArticleFeaturedItem";

type Props = {
  title: string;
  posts: PostListItem[];
  baseUrl: string;
};

function PostSectionList({ title, posts, baseUrl }: Props) {
  const firstPost = posts[0];
  const nextPosts = posts.slice(1, 5);

  if (!firstPost) return null;

  return (
    <>
   
      <div className="w-full py-2 bg-red-500 pl-4 border-l-8 border-red-800 mt-4">
        <h1 className="text-xl text-white">{title}</h1>
      </div>

      <div className="grid grid-cols-2 pt-2 border-2 border-gray-200">
        <div className="p-4">
          <Link to={`/chitiettin/${firstPost.id}`}>
            <ArticleFeatured
              image={
                firstPost.thumbnailUrl
                  ? `${baseUrl}${firstPost.thumbnailUrl}`
                  : "/images/placeholder.jpg"
              }
              title={firstPost.title}
              date={firstPost.createdAt}
              description=""
            />
          </Link>
        </div>

        <div className="p-4">
          {nextPosts.map((item) => (
            <ArticleFeaturedItem
              key={item.id}
              title={item.title}
              date={item.createdAt}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PostSectionList;
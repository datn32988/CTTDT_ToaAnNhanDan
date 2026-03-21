import { Link } from "react-router-dom";
import type { PostListItem } from "../types/Post.type";

type Props = {
  title: string
  posts: PostListItem[];
  baseUrl: string;
};

function PostSectionFeatured({ posts, baseUrl, title }: Props) {
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  if (!mainPost) return null;

  return (
    <div>
      <div className="w-full py-2 bg-red-500 pl-4 border-l-8 border-red-800 mt-4">
        <h1 className="text-xl text-white">{title}</h1>
      </div>
        <div className="grid grid-cols-2 border-2 border-gray-200 gap-4">
        
        <div className="col-span-1 p-2">
          <Link to={`/chitiettin/${mainPost.id}`}>
            <img
              src={
                mainPost.thumbnailUrl
                  ? `${baseUrl}${mainPost.thumbnailUrl}`
                  : "/images/placeholder.jpg"
              }
            />
            <h2 className="text-lg font-bold hover:text-red-500">
              {mainPost.title}
            </h2>
          </Link>
        </div>
        <div className="col-span-1">
          {sidePosts.map((post) => (
            <Link key={post.id} to={`/chitiettin/${post.id}`}>
              <div className="flex p-4">
                <img
                  src={
                    post.thumbnailUrl
                      ? `${baseUrl}${post.thumbnailUrl}`
                      : "/images/placeholder.jpg"
                  }
                  className="w-20 h-16 object-cover"
                />
                <h2 className="ml-2 text-sm hover:text-red-500">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
   
  );
}

export default PostSectionFeatured;
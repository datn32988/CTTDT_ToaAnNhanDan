import { Link } from "react-router-dom";
import type { PostListItem } from "../types/Post.type";

type Props = {
  posts: PostListItem[];
  baseUrl: string;
};

function PostSectionFeatured({ posts, baseUrl }: Props) {
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  if (!mainPost) return null;

  return (
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
  );
}

export default PostSectionFeatured;
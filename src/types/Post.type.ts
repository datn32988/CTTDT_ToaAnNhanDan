export interface Post{
     id: number;
    categoryId: number;
    rootCategoryId: number,
    title: string;
    content: string; 
    createdAt: string; 
    media: Media[];
}

export interface PostDetail{
    id: number;
    categoryId: number;
    title: string;
    content: string; 
    createdAt: string; 
    media: Media[];
}
export interface Media {
    id: number;
    url: string;
    mediaType: number;
    isThumbnail: boolean;
}

export  interface PostResponse {
    items: Post[];
    paging: {
        page: number;
        next: number | null;
        prev: number | null;
    }
}

export interface PostListResponse {
  totalPages: number;
  items: PostListItem[];
  paging: {
    page: number;
    next: number | null;
    prev: number | null;
  };
}
export interface PostListItem {
  id: number;
  categoryId: number
  rootCategoryId: number
  title: string;
  createdAt: string,
  thumbnailUrl?: string | null;
  thumbnailMediaType: number
}
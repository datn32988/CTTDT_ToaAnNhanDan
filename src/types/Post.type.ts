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
  flatMap(arg0: (x: any) => any): unknown;
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

export interface PostListVidepResponse {
  flatMap(arg0: (x: any) => any): unknown;
  totalPages: number;
  items: PostListVideoItem[];
  paging: {
    page: number;
    next: number | null;
    prev: number | null;
  };
}
export interface PostListVideoItem {
  id: number;
  categoryId: number
  rootCategoryId: number
  title: string;
  createdAt: string,
  thumbnailUrl?: string | null;
  thumbnailMediaType: number,
  videoUrl: string
}
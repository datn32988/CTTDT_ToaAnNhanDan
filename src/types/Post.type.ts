export interface Post{
    id: number,
    idCategory: number,
    image: string,
    title: string,
    doc: string,
    date: Date
}

export interface PostDetail{
    id: number,
    categoryId:number,
    categoryName:string,
    title: string,
    doc: string,
    date: Date | string,
}

export  interface PostResponse {
    items: Post[];
    paging: {
        page: number;
        next: number | null;
        prev: number | null;
    }
}
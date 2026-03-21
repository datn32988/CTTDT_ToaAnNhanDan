import PostArticleLayout from "../../layouts/PostArticleLayout";
import PostVideoFirst from "./widgets/PostVideoFirst";


function ListPostVideoPage(){
    return(
        <PostArticleLayout>
            <div className="">
                <PostVideoFirst/>
            </div>
        </PostArticleLayout>
      
    );
}

export default ListPostVideoPage;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home_pages";
import RegisterPage from "../pages/Auth/Register_page";
import LoginPage from "../pages/Auth/Login_page";
import IntroducePage from "../pages/Introduce_page/Introduce_page";
import ListPostPage from "../pages/ListPost_page/ListPost_page";
import PostDetailPage from "../pages/Post_detail/Post_Detail";
import CreatePostPage from "../pages/Post/CreatePost_page";
import TrialNewPage from "../pages/ListPostByRootCategory_page/ListPostByRootCategory_page";
import AdminPage from "../pages/Admin/Admin_page";
import ProtectedRoute from "../components/ProtectedRoute";
import ArticleListItem from "../pages/ArticleListItem_page/ArticleListItem";
import DocManagentPage from "../pages/DocManegment_page/DocManagment_page";
import CreatePostTrialNew from "../pages/Post/CreatePostTrialNew_page";
import ListPostByRootCategory from "../pages/ListPostByRootCategory_page/ListPostByRootCategory_page";
import CreatePostImageNewPage from "../pages/Post/CreatePostImageNew";
import ListPostImagePage from "../pages/ListPostImage_page/ListpostImagePage";
import PostImageDetail from "../pages/PostImageDetail_page/PostImageDetail";
import CreatePostVideoNew from "../pages/Post/CreatePostVideoNew";
import ListPostVideoPage from "../pages/ListPostVideo_page/ListPostVideo";
import PostVideoDetailPage from "../pages/PostVideoDetail_page/PostVideoDetial";


function AppRoutes (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dangky" element={<RegisterPage />} />
                <Route path="/dangnhap" element={<LoginPage />} />
                <Route path="/gioithieu" element={<IntroducePage/>} />
                <Route path="/danhsachbangtin" element={<ListPostPage/>}/>
                <Route path="/chitiettin/:id" element={<PostDetailPage/>}/>
                <Route path="/muchienthi" element={<ArticleListItem/>}/>
                <Route path="/tinxetsu" element={<ListPostByRootCategory/>}/>
                <Route path="/quanlyvanban" element={<DocManagentPage/>}/>
                <Route path="/posts/category/:id" element={<ArticleListItem />} />  
                <Route path="/danhsach/category/:id" element={<ListPostByRootCategory />} />
                <Route path="/thuvienanh/:id" element={<PostImageDetail />} />
                 <Route path="/tinvideo/:id" element={<PostVideoDetailPage />} />
                <Route path="/tinvideo" element={<ListPostVideoPage/>}/>
                <Route path="/thuvienanh" element={<ListPostImagePage/>}/>
                <Route path="/admin" element={<ProtectedRoute>
                    <AdminPage/>
                </ProtectedRoute>  }/>
                
                <Route path="/dangbai" element = {
                    <ProtectedRoute>
                         <CreatePostPage/>
                    </ProtectedRoute>
                   
                    
                    }/>
                    <Route path="/dangtinxetxu" element = {
                        <ProtectedRoute>
                            <CreatePostTrialNew/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/dangtinvideo" element = {
                        <ProtectedRoute>
                            <CreatePostVideoNew/>
                        </ProtectedRoute>
                    }/>
                      <Route path="/dangtinanh" element = {
                    <ProtectedRoute>
                         <CreatePostImageNewPage/>
                    </ProtectedRoute>
                   
                    
                    }/>
                    
            </Routes>
        
        </BrowserRouter>

    );
}

export default AppRoutes;
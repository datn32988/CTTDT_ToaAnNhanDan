import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home_pages";
import RegisterPage from "../pages/Auth/Register_page";
import LoginPage from "../pages/Auth/Login_page";
import IntroducePage from "../pages/Introduce_page/Introduce_page";
import ListPostPage from "../pages/ListPost_page/ListPost_page";
import PostDetailPage from "../pages/Post_detail/Post_Detail";
import CreatePostPage from "../pages/Post/CreatePost_page";
import TrialNewPage from "../pages/TrialNew_page/TrialNew_page";
import AdminPage from "../pages/Admin/Admin_page";
import ProtectedRoute from "../components/ProtectedRoute";
import ArticleListItem from "../pages/ArticleListItem_page/ArticleListItem";
import DocManagentPage from "../pages/DocManegment_page/DocManagment_page";


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
                <Route path="/tinxetsu" element={<TrialNewPage/>}/>
                <Route path="/quanlyvanban" element={<DocManagentPage/>}/>
                
                <Route path="/admin" element={<ProtectedRoute>
                    <AdminPage/>
                </ProtectedRoute>  }/>
                
                <Route path="/dangbai" element = {
                    <ProtectedRoute>
                         <CreatePostPage/>
                    </ProtectedRoute>
                   
                    
                    }/>
            </Routes>
        
        </BrowserRouter>

    );
}

export default AppRoutes;
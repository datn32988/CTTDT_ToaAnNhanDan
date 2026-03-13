import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home_pages";
import RegisterPage from "../pages/Auth/Register_page";
import LoginPage from "../pages/Auth/Login_page";
import IntroducePage from "../pages/Introduce_page/Introduce_page";


function AppRoutes (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dangky" element={<RegisterPage />} />
                <Route path="/dangnhap" element={<LoginPage />} />
                <Route path="/gioithieu" element={<IntroducePage/>} />
            </Routes>
        
        </BrowserRouter>

    );
}

export default AppRoutes;
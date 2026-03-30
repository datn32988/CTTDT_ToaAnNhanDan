import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) =>{
      e.preventDefault();
      try{
        const res = await loginService({username, password })
         console.log("Login success:", res);
         navigate("/dangbai");
      }catch (error)
      {
        console.error("Login failed");
      }
    }

  return (
    <div className="overflow-x-hidden">
        <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-md shadow-md w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng nhập
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email
          </label>

          <input
            type=""
            placeholder="Nhập usename"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Mật khẩu
          </label>

          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Đăng nhập
        </button>

     
        <p className="text-center mt-4 text-sm">
          Chưa có tài khoản? 
          <span className="text-red-600 cursor-pointer ml-1">
            Đăng ký
          </span>
        </p>

      </form>
    
    </div>
    <Footer />
    </div>
  );
}

export default LoginForm;

function natigate() {
  throw new Error("Function not implemented.");
}

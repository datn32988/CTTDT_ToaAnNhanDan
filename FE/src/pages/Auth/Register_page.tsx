import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";

function RegisterPage(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e:any) => {
      e.preventDefault();
  
      console.log({
        email,
        password
      });
    };
    return (
       
        <div className="">
            <Header />
             <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng ký
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Nhập email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
          Đăng ký
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

export default RegisterPage;
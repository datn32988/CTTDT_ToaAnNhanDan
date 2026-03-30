import {  useState } from "react";
import { commentService } from "../services/commentService";


interface Props{
    postId: number;
}

function FeedBack({postId}: Props){
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () =>{
        if(!content.trim()){
            alert("Vui Lòng nhập comment")
            return;
        }
        try{
            setLoading(true);
            await commentService.createComment(postId, {
                content, authorName
            });

            setContent("");
            setAuthorName("");
            console.log("thanh cong")
        }catch (error){
            console.log(error);
        }
       
    };
     return (

        <div className="">
            <div className="border-b-2 border-red-500 pl-2 mb-2">
                 <h1 className="pt-3 text-red-500 text-xl pb-2">Ý kiến bạn đọc</h1>
            </div>
           
            <div className="pt-10 text-lg bg-gray-100 p-4">
                <div className="border-b-2 border-red-500">
                     <h3 className="text-red-500 py-2 pl-2">Ý kiến bình luận</h3>
                </div>
           
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <input
                        placeholder="Email"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-sm m-2 " 
            />
            </div>
                <div className="col-span-1">
                      <input
                        placeholder="Họ Tên"
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-sm m-2"
            />
                </div>
            </div>
            

            <textarea
                placeholder="Nhập nội dung..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ display: "block", marginBottom: "10px", width: "100%", height: "100px" }}
                className="m-2"
            />
            <div className="flex justify-center items-center">
                <button onClick={handleSubmit} disabled={loading} className="bg-red-600 text-white py-2 px-4 rounded-lg text-center">
                {loading ? "Đang gửi..." : "Gửi"}
            </button>
            </div>
            
        </div>
        </div>
        
    );


}

export default FeedBack;
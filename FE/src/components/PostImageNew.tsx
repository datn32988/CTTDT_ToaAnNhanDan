import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
type Props = {
    image: string,
    date: Date,
    title: string,
}

function PostImageNew({image, date, title}:Props){
    return(
        <div>
           <div className="">
                <div>
                    <img src={image} alt="" />
                </div>
                <h1 className="text-sm text-black hover:text-red-500">{title} <span>{new Date(date).toLocaleDateString('vi-VN')}</span></h1>
                 <div className="flex space-x-2  pt-4">
                            <a href="#" className="text-blue-500 hover:text-blue-700">
                                <CiFacebook />
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-600">
                                <CiTwitter />
                            </a>
                            <a href="#" className="text-red-500 hover:text-red-700">
                                 <CgMail />
                            </a>
                </div>
           </div>
           
        </div>
    );
}

export default PostImageNew;
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Notification from "../../components/Notification";

import VerticalBanner from "../../components/VerticalBanner";
import PostNewFirst from "./widgets/PostNewFirst";
import PostNewItem from "./widgets/PostNewItem";


function TrialNewPage(){
    return(
        <div className="overflow-x-hidden">
            <Header/>
            <Notification/>
            
            <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">
                  <div className="col-span-1 w-full">
                    
                    <Category name={"TIN XÉT XỬ"} items={[
                        {id: "1",name:"Các vụ án lớn"},
                        {id: "2",name:"Tổ Thẩm phán và HĐTP TANDTC"},
                        {id: "3",name:"Tòa án địa phương"}]}  />
                    <VerticalBanner/>
                </div>
                <div className="col-span-3 bg-white ml-4  ">
                    <div className="pl-5">
                         <div className=" pt-4 mb-3 pb-1 ">
                            <a href="" className="hover:text-red-500">Trang chủ <span className="font-light">/ Tin xét sử </span> </a> 
                        </div>
                       <PostNewFirst/>
                       <PostNewItem/>
                    </div>
                </div>
                </div>
            <Footer/>
        </div>
    );
}

export default TrialNewPage;
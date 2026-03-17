import Category from "../../components/Category";
import Notification from "../../components/Notification";
import NewsLayout from "../../layouts/NewsLayout";
import SearchDocument from "./widgets/SearchDocument";




function DocManagentPage(){
    return(
        <NewsLayout>
            <div className="">
                <Notification/>
                <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 gap-4 ">
                    <div className="col-span-1">
                        <Category name={"TIN XÉT XỬ"} items={[
                        {id: "1",name:"Các vụ án lớn"},
                        {id: "2",name:"Tổ Thẩm phán và HĐTP TANDTC"},
                        {id: "3",name:"Tòa án địa phương"}]}  />
                    </div>
                    <div className="col-span-3">
                        <div>
                            <div className=" pt-4 mb-3 pb-1 ">
                            <a href="" className="hover:text-red-500">Trang chủ <span className="font-light">/ Thông báo chỉ đạo điều hành</span> </a> 
                        </div>
                            <SearchDocument/>
                        </div>
                    </div>
                </div>
            </div>
        </NewsLayout>
    );
}

export default DocManagentPage;
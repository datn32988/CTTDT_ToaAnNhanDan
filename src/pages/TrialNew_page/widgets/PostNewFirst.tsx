import MainCase from "../../../components/MainCase";
import CasesSection from "./CasesSection";



function PostNewFirst(){
    return(
        <div>
            <div className="bg-red-600 border-l-8 border-red-800">
                <h1 className="text-white p-2 text-2xl">CÁC VỤ ÁN LỚP</h1>
            </div>
            <div className=" grid grid-cols-2 border-2 border-gray-200">
                <div className="col-span-1 p-4">
                    <MainCase image={"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop"} title={"Phiên tòa lưu động trực tuyến - Bước đổi mới trong công tác tuyên truyền pháp luật, tuyên truyền chuyển đổi số của Tòa án nhân dân tỉnh Nghệ An "} date={new Date(25/12/2004)} description={"Triển khai thực hiện chỉ đạo của Tòa án nhân dân tối cao về tháng hành động phòng, chống ma túy (tháng 6/2024), phòng, chống mua bán người (tháng 7/2024); "}/>
                </div>
                <div className="col-span-1 p-4">
                    <CasesSection/>
                </div>
            </div>
        </div>
    );
}

export default PostNewFirst;
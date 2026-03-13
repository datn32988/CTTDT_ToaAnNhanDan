import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Notification from "../../components/Notification";
import VerticalBanner from "../../components/VerticalBanner";
import image from "../../assets/Emblem_of_Vietnam.svg.png"
import image1 from "../../assets/co-cau-to-chuc-toa-an.webp";
import image2 from "../../assets/bg-gt.png"
function IntroducePage(){

  return (
    <div className="overflow-x-hidden">
      <Header />
        <Notification />
         <div className="bg-gray-100  ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">
                <div className="col-span-1 w-full">
                    
                    <Menu />
                    <VerticalBanner/>
                </div>
                <div className="col-span-3 bg-white  ">
                    <div>
                        <div className="pl-4 pt-4 ">
                            <a href="" className="hover:text-red-500">Trang chủ <span>/</span> <a href="">Giới thiệu</a></a> 
                        </div>
                        <div className="border-b-2 border-b-red-400 pl-3 ml-3 text-xl text-red-500 bg-gray-200">
                            <h1>KHÁI QUÁT VỀ TÒA ÁN NHÂN DÂN NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                        </div>

                        <div className=" pt-10 border-1 border-spacing-3 border-red-500">
                             

                            <h1 className="text-red-500 text-center">KHÁI QUÁT VỀ TÒA ÁN NHÂN DÂN</h1>
                             <h1 className="text-red-500 text-center">NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                            <img src={image} alt="" className="w-[150px] mx-auto block py-3" />

                            <p className="text-lg pl-20">Tòa án nhân dân là cơ quan xét xử của nước Cộng hòa xã hội chủ nghĩa Việt Nam, thực hiện quyền tư pháp. Tòa án nhân dân gồm Tòa án nhân dân tối cao và các Tòa án khác do luật định. Tòa án nhân dân có nhiệm vụ bảo vệ công lý, bảo vệ quyền con người, quyền công dân, bảo vệ chế độ xã hội chủ nghĩa, bảo vệ lợi ích của Nhà nước, quyền và lợi ích hợp pháp của tổ chức, cá nhân. Bằng hoạt động của mình, Tòa án góp phần giáo dục công dân trung thành với Tổ quốc, nghiêm chỉnh chấp hành pháp luật, tôn trọng những quy tắc của cuộc sống xã hội, ý thức đấu tranh phòng, chống tội phạm, các vi phạm pháp luật khác.</p>
                            <p className="text-lg pl-20">Việc xét xử sơ thẩm của Tòa án nhân dân có Hội thẩm tham gia, trừ trường hợp xét xử theo thủ tục rút gọn. Thẩm phán, Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật; nghiêm cấm cơ quan, tổ chức, cá nhân can thiệp vào việc xét xử của Thẩm phán, Hội thẩm. Tòa án nhân dân xét xử công khai. Trong trường hợp đặc biệt cần giữ bí mật nhà nước, thuần phong, mỹ tục của dân tộc, bảo vệ người chưa thành niên hoặc giữ bí mật đời tư theo yêu cấu chính đáng của đương sự, Tòa án nhân dân có thể xét xử kín. Tòa án nhân dân xét xử tập thể và quyết định theo đa số, trừ trường hợp xét xử theo thủ tục rút gọn. Nguyên tắc tranh tụng trong xét xử được bảo đảm. Chế độ xét xử sơ thẩm, phúc thẩm được bảo đảm. Quyền bào chữa của bị can, bị cáo, quyền bảo vệ lợi ích hợp pháp của đương sự được bảo đảm.</p>
                            <h1 className="pt-3 font-bold text-black-500 text-center">SƠ ĐỒ CƠ CẤU TỔ CHỨC CỦA NGÀNH TÒA ÁN NHÂN DÂN</h1>
                            <img src={image1} alt=""className=" mx-auto block py-3" />
                              <h1 className="text-red-500 text-center font-bold">LUẬT SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA LUẬT</h1>
                              <h1 className="text-red-500 text-center font-bold">TỔ CHỨC TÒA ÁN NHÂN DÂN NĂM 2025 QUY ĐỊNH:</h1>
                            <h1 className="pt-3 font-bold text-black-500 pl-20">SƠ ĐỒ CƠ CẤU TỔ CHỨC CỦA NGÀNH TÒA ÁN NHÂN DÂN</h1>
                        </div>
                    </div>
                </div>
         </div>

      <Footer />
    </div>
  );
}

export default IntroducePage;
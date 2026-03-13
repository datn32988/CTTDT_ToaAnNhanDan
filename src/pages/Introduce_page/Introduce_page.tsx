import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Notification from "../../components/Notification";
import VerticalBanner from "../../components/VerticalBanner";
import image from "../../assets/Emblem_of_Vietnam.svg.png"
import image1 from "../../assets/co-cau-to-chuc-toa-an.webp";
import image2 from "../../assets/bg-gt.png"
import image3 from "../../assets/bg-gt1.png"
function IntroducePage(){

  return (
    <div className="overflow-x-hidden">
      <Header />
        <Notification />
         <div className="bg-white ml-[160px] mr-[127px] grid grid-cols-4 mb-10 pt-2">
                <div className="col-span-1 w-full">
                    
                    <Menu />
                    <VerticalBanner/>
                </div>
                <div className="col-span-3 bg-white  ">
                    <div>
                        <div className="pl-4 pt-4 ">
                            <a href="" className="hover:text-red-500">Trang chủ <span>/</span> <a href="">Giới thiệu</a></a> 
                        </div>
                        <div className="border-b-2 border-b-red-400 pl-3 ml-3 text-xl text-red-500 bg-gray-200 mb-4">
                            <h1>KHÁI QUÁT VỀ TÒA ÁN NHÂN DÂN NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                        </div>

                        <div className="ml-4 pt-10 border-1 border-spacing-3 border-x-2 border-y-2 border-red-500 " style={{ backgroundImage: `url(${image2}), url(${image3}) ` , backgroundPosition: "center top, center bottom",backgroundSize:"890px ", backgroundRepeat: "no-repeat", width:"900px"}}>
                            <h1 className="text-red-500 text-center">KHÁI QUÁT VỀ TÒA ÁN NHÂN DÂN</h1>
                             <h1 className="text-red-500 text-center">NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                            <img src={image} alt="" className="w-[150px] mx-auto block py-3" />

                            <p className="text-lg pl-10">Tòa án nhân dân là cơ quan xét xử của nước Cộng hòa xã hội chủ nghĩa Việt Nam, thực hiện quyền tư pháp. Tòa án nhân dân gồm Tòa án nhân dân tối cao và các Tòa án khác do luật định. Tòa án nhân dân có nhiệm vụ bảo vệ công lý, bảo vệ quyền con người, quyền công dân, bảo vệ chế độ xã hội chủ nghĩa, bảo vệ lợi ích của Nhà nước, quyền và lợi ích hợp pháp của tổ chức, cá nhân. Bằng hoạt động của mình, Tòa án góp phần giáo dục công dân trung thành với Tổ quốc, nghiêm chỉnh chấp hành pháp luật, tôn trọng những quy tắc của cuộc sống xã hội, ý thức đấu tranh phòng, chống tội phạm, các vi phạm pháp luật khác.</p>
                            <p className="text-lg pl-10">Việc xét xử sơ thẩm của Tòa án nhân dân có Hội thẩm tham gia, trừ trường hợp xét xử theo thủ tục rút gọn. Thẩm phán, Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật; nghiêm cấm cơ quan, tổ chức, cá nhân can thiệp vào việc xét xử của Thẩm phán, Hội thẩm. Tòa án nhân dân xét xử công khai. Trong trường hợp đặc biệt cần giữ bí mật nhà nước, thuần phong, mỹ tục của dân tộc, bảo vệ người chưa thành niên hoặc giữ bí mật đời tư theo yêu cấu chính đáng của đương sự, Tòa án nhân dân có thể xét xử kín. Tòa án nhân dân xét xử tập thể và quyết định theo đa số, trừ trường hợp xét xử theo thủ tục rút gọn. Nguyên tắc tranh tụng trong xét xử được bảo đảm. Chế độ xét xử sơ thẩm, phúc thẩm được bảo đảm. Quyền bào chữa của bị can, bị cáo, quyền bảo vệ lợi ích hợp pháp của đương sự được bảo đảm.</p>
                            <h1 className="pt-3 font-bold text-black-500 text-center">SƠ ĐỒ CƠ CẤU TỔ CHỨC CỦA NGÀNH TÒA ÁN NHÂN DÂN</h1>
                            <img src={image1} alt=""className=" mx-auto block py-3" />
                              <h1 className="text-red-500 text-center font-bold">LUẬT SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA LUẬT</h1>
                              <h1 className="text-red-500 text-center font-bold">TỔ CHỨC TÒA ÁN NHÂN DÂN NĂM 2025 QUY ĐỊNH:</h1>
                            <h1 className="pt-3 font-bold text-black-500 pl-10">Theo Điều 2. Vị trí, chức năng của Tòa án nhân dân</h1>
                            <p className="text-lg pl-10">1. Tòa án nhân dân là cơ quan xét xử của nước Cộng hòa xã hội chủ nghĩa Việt Nam, thực hiện quyền tư pháp.</p>
                            <p className="text-lg pl-10">2. Tòa án nhân dân thực hiện quyền tư pháp để thực thi nhiệm vụ bảo vệ công lý, bảo vệ quyền con người, quyền công dân, bảo vệ chế độ xã hội chủ nghĩa, bảo vệ lợi ích của Nhà nước, quyền và lợi ích hợp pháp của tổ chức, cá nhân; bằng hoạt động của mình, góp phần giáo dục công dân trung thành với Tổ quốc, nghiêm chỉnh chấp hành pháp luật, ý thức đấu tranh phòng, chống tội phạm và các vi phạm pháp luật khác.</p>
                             <p className="text-lg pl-10">3. Tòa án nhân dân nhân danh nước Cộng hòa xã hội chủ nghĩa Việt Nam xét xử, giải quyết các vụ án, vụ việc theo quy định của pháp luật.</p>
                             <h1 className="pt-3 font-bold text-black-500 pl-10">Theo Điều 3. Nhiệm vụ, quyền hạn của Tòa án nhân dân</h1>
                            <p className="text-lg pl-10 pb-2">1. Tòa án nhân dân thực hiện quyền tư pháp bao gồm quyền xét xử, quyết định về các tranh chấp, vi phạm pháp luật, về những vấn đề liên quan đến quyền con người, quyền, nghĩa vụ của cơ quan, tổ chức, cá nhân theo quy định của luật; bảo đảm áp dụng thống nhất pháp luật trong xét xử.</p>
                            <p className="text-lg pl-10 pb-2">2. Khi thực hiện quyền tư pháp, Tòa án nhân dân có nhiệm vụ, quyền hạn sau đây:</p>
                            <p className="text-lg pl-10 pb-2">a) Xét xử, giải quyết vụ án hình sự, vụ án hành chính, vụ việc dân sự (gồm vụ án dân sự và việc dân sự), vụ việc phá sản và vụ án, vụ việc khác theo quy định của pháp luật;</p>
                            <p className="text-lg pl-10 pb-2">b) Giải quyết, xét xử vi phạm hành chính theo quy định của luật;</p>
                            <p className="text-lg pl-10 pb-2">c) Quyết định những vấn đề liên quan đến quyền con người, quyền và nghĩa vụ của cơ quan, tổ chức, cá nhân theo quy định của luật;</p>
                            <p className="text-lg pl-10 pb-2">d) Phát hiện, kiến nghị về tính hợp hiến, hợp pháp của văn bản quy phạm pháp luật trong xét xử, giải quyết vụ án, vụ việc theo quy định của luật;</p>
                            <p className="text-lg pl-10 pb-2">đ) Giải thích áp dụng pháp luật trong xét xử, giải quyết vụ án, vụ việc;</p>
                            <p className="text-lg pl-10 pb-2">e) Tổng kết thực tiễn xét xử, bảo đảm áp dụng thống nhất pháp luật trong xét xử; phát triển án lệ;</p>
                            <p className="text-lg pl-10 pb-2">g) Thực hiện nhiệm vụ, quyền hạn về thi hành án theo quy định của luật;</p>
                            <p className="text-lg pl-10 pb-2">h) Thực hiện nhiệm vụ, quyền hạn khác theo quy định của pháp luật.</p>
                             <h1 className="pt-3 font-bold text-black-500 pl-10">Theo Điều 4. Tổ chức và thẩm quyền thành lập, giải thể các Tòa án nhân dân</h1>
                            <p className="text-lg pl-10 pb-2">1. Tổ chức của Tòa án nhân dân bao gồm:</p>
                            <p className="text-lg pl-10 pb-2">a) Tòa án nhân dân tối cao;</p>
                            <p className="text-lg pl-10 pb-2">b) Tòa án nhân dân tỉnh, thành phố (sau đây gọi là Tòa án nhân dân cấp tỉnh);</p>
                            <p className="text-lg pl-10 pb-2">c) Tòa án nhân dân khu vực;</p>
                            <p className="text-lg pl-10 pb-2">d) Tòa án chuyên biệt tại Trung tâm tài chính quốc tế (sau đây gọi là Tòa án chuyên biệt);</p>
                            <p className="text-lg pl-10 pb-2">đ) Tòa án quân sự trung ương, Tòa án quân sự quân khu và tương đương, Tòa án quân sự khu vực (sau đây gọi chung là Tòa án quân sự).</p>
                            <p className="text-lg pl-10 pb-2">2. Thẩm quyền thành lập, giải thể Tòa án nhân dân cấp tỉnh, Tòa án nhân dân khu vực; phạm vi thẩm quyền theo lãnh thổ của một số Tòa án nhân dân cấp tỉnh, của Tòa án nhân dân khu vực và Tòa án quân sự được quy định như sau:</p>
                            <p className="text-lg pl-10 pb-2">a) Ủy ban Thường vụ Quốc hội quyết định thành lập, giải thể Tòa án nhân dân cấp tỉnh, Tòa án nhân dân khu vực; quy định về phạm vi thẩm quyền theo lãnh thổ của Tòa án nhân dân khu vực theo đề nghị của Chánh án Tòa án nhân dân tối cao;</p>
                            <p className="text-lg pl-10 pb-2">b) Ủy ban Thường vụ Quốc hội quy định về phạm vi thẩm quyền theo lãnh thổ của một số Tòa án nhân dân cấp tỉnh đối với yêu cầu hủy phán quyết trọng tài, đăng ký phán quyết trọng tài vụ việc theo đề nghị của Chánh án Tòa án nhân dân tối cao;</p>
                            <p className="text-lg pl-10 pb-2">c) Ủy ban Thường vụ Quốc hội quy định về phạm vi thẩm quyền theo lãnh thổ của một số Tòa án nhân dân khu vực giải quyết vụ việc phá sản; vụ việc dân sự, kinh doanh, thương mại, vụ án hành chính về sở hữu trí tuệ, chuyển giao công nghệ theo đề nghị của Chánh án Tòa án nhân dân tối cao;</p>
                            <p className="text-lg pl-10 py-5">d) Ủy ban Thường vụ Quốc hội quyết định thành lập, giải thể và quy định về phạm vi thẩm quyền theo lãnh thổ của Tòa án quân sự quân khu và tương đương, Tòa án quân sự khu vực theo đề nghị của Chánh án Tòa án nhân dân tối cao sau khi thống nhất với Bộ trưởng Bộ Quốc phòng.</p>
                           
                        </div>
                    </div>
                </div>
         </div>

      <Footer />
    </div>
  );
}

export default IntroducePage;
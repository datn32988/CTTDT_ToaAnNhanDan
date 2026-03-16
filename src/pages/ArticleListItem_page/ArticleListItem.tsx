
import ArticleItem from "../../components/ArticleItem";
import PostArticleLayout from "../../layouts/PostArticleLayout";
import ArticleItemSpecial from "./widgets/ArticleItemspecial";

function ArticleListItem(){
    const data =[
        {
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date:  new Date("2025-07-01"),
            decscription : "Sáng 15/3, hòa trong không khí tưng bừng, phấn khởi của Ngày bầu cử – ngày hội của toàn dân, cùng với cử tri cả nước, đồng chí Nguyễn Văn Quảng, Bí thư Trung ương Đảng, Bí thư Đảng ủy, Chánh án Tòa án nhân dân tối cao đã thực hiện quyền và nghĩa vụ công dân, tham gia bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026-2031."
        },
        {
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date:  new Date("2025-07-01"),
            decscription : "Sáng 15/3, hòa trong không khí tưng bừng, phấn khởi của Ngày bầu cử – ngày hội của toàn dân, cùng với cử tri cả nước, đồng chí Nguyễn Văn Quảng, Bí thư Trung ương Đảng, Bí thư Đảng ủy, Chánh án Tòa án nhân dân tối cao đã thực hiện quyền và nghĩa vụ công dân, tham gia bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026-2031."
        },
        {
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date:  new Date("2025-07-01"),
            decscription : "Sáng 15/3, hòa trong không khí tưng bừng, phấn khởi của Ngày bầu cử – ngày hội của toàn dân, cùng với cử tri cả nước, đồng chí Nguyễn Văn Quảng, Bí thư Trung ương Đảng, Bí thư Đảng ủy, Chánh án Tòa án nhân dân tối cao đã thực hiện quyền và nghĩa vụ công dân, tham gia bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026-2031."
        },
        {
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date:  new Date("2025-07-01"),
            decscription : "Sáng 15/3, hòa trong không khí tưng bừng, phấn khởi của Ngày bầu cử – ngày hội của toàn dân, cùng với cử tri cả nước, đồng chí Nguyễn Văn Quảng, Bí thư Trung ương Đảng, Bí thư Đảng ủy, Chánh án Tòa án nhân dân tối cao đã thực hiện quyền và nghĩa vụ công dân, tham gia bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân các cấp nhiệm kỳ 2026-2031."
        },
    ];

    const data1 = data[0];
    
    return(
    <PostArticleLayout>
        <div className=" ml-4">
            <div className=" mb-6">
                <ArticleItemSpecial image={data1.image} title={data1.title} date={data1.date} decscripsion={data1.decscription} nameCategory={"Tin xét xử các vụ án lớn"}/>
            </div>
           {data.map((item,index) => (
            <ArticleItem 
                key={index}
                image={item.image}
                date={item.date}
                title={item.title}
                decscription={item.decscription}
            
            />
           ))}


           
        </div>
    </PostArticleLayout>
    );

}

export default ArticleListItem;
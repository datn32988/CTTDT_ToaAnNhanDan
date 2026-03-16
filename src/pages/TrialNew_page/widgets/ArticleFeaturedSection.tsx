import ArticleFeaturedItem from "../../../components/ArticleFeaturedItem";




function ArticleFeaturedSection(){
    const data = [
        {
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date: new Date("2025-07-01")
        },
        {
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date: new Date("2025-07-01")
        },
        {
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date: new Date("2025-07-01")
        },
        {
            title: "Phiên họp toàn thể tháng 2 năm 2022 của Hội đồng Thẩm phán Tòa án nhân dân tối cao",
            date: new Date("2025-07-01")
        },
    ];

   return (
    <div className="space-y-2">

      {data.map((item, index) => (
        <ArticleFeaturedItem
            key={index}
            title={item.title}
            date={item.date}
        />
      ))}

    </div>
  );

}

export default ArticleFeaturedSection;
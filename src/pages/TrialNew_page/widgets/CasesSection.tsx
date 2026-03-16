import CaseList from "../../../components/CaseList";

function CasesSection() {

  const cases = [
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
      title: "Tòa án nhân dân thành phố Bạc Liêu xét xử..."
    },
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
      title: "Lĩnh án tù vì tổ chức tiệc ma túy"
    },
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
      title: "Xét xử lưu động các vụ án ma túy"
    }
  ]

  return (
    <div className="border-l-2 border-gray-400"><CaseList cases={cases}/></div>
  );
}
export default CasesSection;
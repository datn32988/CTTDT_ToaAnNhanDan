
import { useEffect, useState } from "react";
import image from "../assets/trongdong-big.png"
import type { CategoryResponse } from "../types/category.type";
import { getCategoriesApi } from "../services/categoryService";


function Category() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoriesApi();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
      <div className="text-white">
            <ul className="" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                <li className="bg-red-500 text-white p-3 text-xl border-l-8 border-red-700">
                    Tin hoạt động
                </li>

                {isLoading ? (
                    <li className="p-4 text-black italic">Đang tải dữ liệu...</li>
                ) : (
                    categories.map((item) => (
                        <li
                            key={item.id}
                            className="py-4 px-4 cursor-pointer border-b border-x-2 border-red-500 text-black hover:bg-gray-100 transition-colors"
                        >
                            {item.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Category
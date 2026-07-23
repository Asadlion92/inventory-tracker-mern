import CategoryCard from "../components/CategoryCard";
import api from "../lib/axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/inventory");
        console.log(res.data)

        const categoryData = Object.values(
          res.data.reduce((acc, item) => {
            const category = item.category;

            if (!acc[category]) {
              acc[category] = {
                category: category,
                totalItems: 0,
                totalPrice: 0,
              };
            }

            acc[category].totalItems += item.quantity;
            acc[category].totalPrice += item.price;

            return acc;
          }, {})
        );

        setCategories(categoryData);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Categories
      </h1>

      <div>
        {categories.map((category) => (
          <CategoryCard
            key={category.category}
            category={category.category}
            totalItems={category.totalItems}
            totalPrice={category.totalPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
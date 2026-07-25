import CategoryCard from "../components/CategoryCard";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { Laptop, Wrench, NotebookText, Shield, Package2, Ellipsis } from 'lucide-react'

const Categories = () => {
  const [categories, setCategories] = useState([]);

const categoryIcons = {
  Consumables: {
    icon: Package2,
    color: "text-blue-500",
  },

  Electronics: {
    icon: Laptop,
    color: "text-purple-500",
  },

  "Office Supplies": {
    icon: NotebookText,
    color: "text-green-500",
  },

  Others: {
    icon: Ellipsis,
    color: "text-gray-500",
  },

  "Safety Equipment": {
    icon: Shield,
    color: "text-red-500",
  },

  Tools: {
    icon: Wrench,
    color: "text-orange-500",
  },
};

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

      <div className="flex justify-center align-center flex-wrap">

        {categories.map((category) => {
          const categoryInfo = categoryIcons[category.category]

          const Icon = categoryInfo.icon;

          return (
            <CategoryCard
              key={category.category}
              category={category.category}
              totalItems={category.totalItems}
              totalPrice={category.totalPrice}
              icon={<Icon className={categoryInfo.color} size={48} />}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
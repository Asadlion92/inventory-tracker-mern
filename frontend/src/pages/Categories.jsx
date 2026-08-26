import CategoryCard from "../components/CategoryCard";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { Laptop, Wrench, NotebookText, Shield, Package2, Ellipsis } from 'lucide-react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

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
        console.log(categoryData)
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const totalCategories = categories.length;
  const totalItems = categories.reduce((total, category) => total + category.totalItems, 0);


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

      <div>
        <h2 className="text-2xl font-bold mt-10">Category Summary</h2>
        <div>
          <h3>Total Categories: {totalCategories}</h3>
          <h3>Total Items: {totalItems}</h3>
        </div>
      </div>
    </div>
  );
};

export default Categories;
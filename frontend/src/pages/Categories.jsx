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
    chartColor: "#3b82f6",
  },

  Electronics: {
    icon: Laptop,
    color: "text-purple-500",
    chartColor: "#a855f7",
  },

  "Office Supplies": {
    icon: NotebookText,
    color: "text-green-500",
    chartColor: "#22c55e",
  },

  Others: {
    icon: Ellipsis,
    color: "text-gray-500",
    chartColor: "#6b7280",
  },

  "Safety Equipment": {
    icon: Shield,
    color: "text-red-800",
    chartColor: "#991b1b",
  },

  Tools: {
    icon: Wrench,
    color: "text-orange-500",
    chartColor: "#f97316",
  },
};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/inventory");
        // console.log(res.data)

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
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

      <div className="flex flex-col lg:flex-row items-center gap-6 mt-10 px-10">
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold mb-5">Category Summary</h2>
          <h3>Total Categories: {totalCategories}</h3>
          <h3>Total Items: {totalItems}</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-10">
          <div className="w-60 h-60 relative">
            <Doughnut
              data={{
                labels: categories.map((category) => category.category),
                datasets: [
                  {
                    data: categories.map((category) => category.totalItems),
                    backgroundColor: categories.map((category) => categoryIcons[category.category].chartColor),
                    borderColor: "#fff",
                    borderWidth: 2,
                  }
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
              }}
            />
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-3 sm:flex-col sm:gap-4">
            {categories.map((category) => (
              <div
                key={category.category}
                className="flex items-center gap-3"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      categoryIcons[category.category].chartColor,
                  }}
                />

                <span className="font-semibold">
                  {category.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
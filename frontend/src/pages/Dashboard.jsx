import { Package, CircleDollarSign, Tag, MoveRight } from 'lucide-react';
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router';
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

const Dashboard = () => {

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const categoryIcons = {
    Consumables: {
      color: "text-blue-500",
      chartColor: "#3b82f6",
    },

    Electronics: {
      color: "text-purple-500",
      chartColor: "#a855f7",
    },

    "Office Supplies": {
      color: "text-green-500",
      chartColor: "#22c55e",
    },

    Others: {
      color: "text-gray-500",
      chartColor: "#6b7280",
    },

    "Safety Equipment": {
      color: "text-red-800",
      chartColor: "#991b1b",
    },

    Tools: {
      color: "text-orange-500",
      chartColor: "#f97316",
    },
  };

  const recentItems = items.slice(0, 3);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

    useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/inventory");
        console.log(res.data)
        setItems(res.data)

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

    fetchDashboard();
  }, []);

  const totalCategories = categories.length;
  const totalItems = categories.reduce((total, category) => total + category.totalItems, 0);
  const totalValue = categories.reduce((total, items) => total + items.totalPrice, 0);


  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
        Dashboard
      </h1>
      <div className='mt-5 flex flex-col gap-8 md:flex-row justify-around items-center w-auto'>
        <div className='flex w-48 justify-between p-2 border-solid border-4 border-gray-500 rounded-xl'>
          <Package className='bg-blue-500 rounded-full size-20 p-4'/>
          <div className='flex flex-col justify-center items-center w-20'>
            <p>Total Items</p>
            <p>{totalItems}</p>
          </div>
        </div>
        <div className='flex w-48 justify-between p-2 border-solid border-4 border-gray-500 rounded-xl'>
          <CircleDollarSign  className='bg-green-500 rounded-full size-20 p-4'/>
          <div className='flex flex-col justify-center items-center w-20'>
            <p>Total Value</p>
            <p>${totalValue}</p>
          </div>
        </div>
        <div className='flex w-48 justify-between p-2 border-solid border-4 border-gray-500 rounded-xl'>
          <Tag className='bg-blue-500 rounded-full size-20 p-4'/>
          <div className='flex flex-col justify-center items-center w-20'>
            <p>Total</p>
            <p>Categories</p>
            <p>{totalCategories}</p>
          </div>
        </div>
      </div>
      <div className='mt-10 flex justify-evenly flex-col gap-16 items-center md:flex-row'>
        <div>
          <h2 className='text-xl font-bold text-center md:text-left'>Inventory Value By Category</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-8">
            <div className="w-60 h-60 relative">
              <Doughnut
                data={{
                  labels: categories.map((category) => category.category),
                  datasets: [
                    {
                      data: categories.map((category) => category.totalPrice),
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
        <div className='border-2 border-gray-500 md:w-1/4 w-auto p-5 rounded-2xl'>
          <h2 className='text-xl font-bold'>Recent Items Added</h2>
          <div>
            {recentItems.map((item) => (
              <div key={item._id}>
              <p className='font-bold text-lg'>{item.name}</p>
              <p className='text-sm text-gray-400'>{formatDate(item.createdAt)}</p>
              </div>
            ))}
            <Link className='text-blue-500' to={'/items'}><span className='flex justify-between w-32'>View all items <MoveRight /></span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
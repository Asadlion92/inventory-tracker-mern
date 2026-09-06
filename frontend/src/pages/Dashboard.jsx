import { Package, CircleDollarSign, Tag, MoveRight } from 'lucide-react';
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router';
const Dashboard = () => {

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Dashboard
      </h1>
      <div className='mt-5 flex justify-around'>
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
      <div className='mt-10 flex justify-evenly'>
        <div className='border-2 border-gray-500 w-1/3 p-5 rounded-2xl'>
          <h2 className='text-xl font-bold'>Inventory Value By Category</h2>
        </div>
        <div className='border-2 border-gray-500 w-1/3 p-5 rounded-2xl'>
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
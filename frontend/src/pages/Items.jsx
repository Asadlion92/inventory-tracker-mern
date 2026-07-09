import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import RateLimitedUI from '../components/RateLimitedUI';
import { toast } from 'react-hot-toast';
import api from './../lib/axios';

const Items = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(()=>{
    const fetchItems = async () => {
      try {
        const res = await api.get('/inventory');
        setItems(res.data);
        setIsRateLimited(false);
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching items");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load items');
        }
      } finally {
        setLoading(false)
      }
    }

    fetchItems();
  }, [])

  //pagination 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left'>Items</h1>
        <Link to={'/add'} className='btn btn-primary w-fit self-center sm:self-auto'>
          <Plus />
          <span>Add Item</span>
        </Link>
      </div>

      {isRateLimited && <RateLimitedUI/>}
      {loading && <div className='text-center text-primary py-10 text-xl'>Loading items...</div>}

      {items.length > 0 && !isRateLimited && (
        <div className="overflow-x-auto">
          <table className="table min-w-[700px]">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id} className="hover:bg-base-300">
                  <th></th>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="btn btn-outline btn-info mr-2"><Pencil /></button>
                    <button className="btn btn-outline btn-error ml-2"><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className='flex justify-center mt-4'>
        <div className="join">

          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-primary" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ArrowRight />
          </button>

        </div>
      </div>
    </div>

  )
}

export default Items
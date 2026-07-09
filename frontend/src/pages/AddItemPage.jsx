import { useState } from 'react';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

const AddItemPage = () => {

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName.trim() || !quantity.trim() || !price.trim()) {
      toast.error("All fields are required");
      return;
    }

      const newItem = {
        name: itemName,
        quantity: Number(quantity),
        price: Number(price),
        category,
      };

    console.log(newItem);

    setLoading(true)
    try {
      await api.post("/inventory",
        newItem
      );
      toast.success("Item added successfully!");
      navigate('/items');
    } catch (error) {
      console.log("Error adding item", error);
      console.error(error.response?.data);
      console.error(error.response?.status);
      console.error(error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating items too fast!", {
          duration: 4000,
          icon: '💀'
        });
      } else {
          toast.error("Failed to add item");
        }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full px-2'>
      <Link to={"/items"} className='btn btn-ghost'>
        <ArrowLeft />
        Back To Items
      </Link>

      <div className='card bg-base-300 w-full'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'>Add Item</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Item Name</span>
              </label>
              <input 
                type="text"
                placeholder='Enter item name'
                className='input input-bordered'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                />
            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Quantity</span>
              </label>
              <input 
                type="number"
                min="1"
                placeholder='Enter quantity'
                className='input input-bordered'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Price</span>
              </label>
              <div className='join w-full'>
                <input 
                type="number"
                min="0.01"
                step="0.01"
                placeholder='Enter price'
                className='input input-bordered join-item w-full'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <span className='join-item btn btn-disabled'><DollarSign /></span>
              </div>

            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Category</span>
              </label>
              <select
                required
                className='select select-bordered w-full' 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Tools">Tools</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Safety Equipment">Safety Equipment</option>
                <option value="Consumables">Consumables</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className='card-actions justify-end'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default AddItemPage
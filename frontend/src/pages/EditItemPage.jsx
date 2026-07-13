import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, LoaderIcon, Trash2, DollarSign } from 'lucide-react';
import api from './../lib/axios';
import { toast } from 'react-hot-toast';

const EditItemPage = () => {

  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/inventory/${id}`);
        console.log(res.data)
        const item = res.data;
        setItemName(item.name);
        setQuantity(item.quantity);
        setPrice(item.price);
        setCategory(item.category);
      } catch (error) {
        console.log("Error in fetching item name", error);
        toast.error("Failed to fetch item name");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!itemName.trim() || quantity <=0 || price <= 0 || !category) {
      toast.error("All fields are required");
      return;
    }

      const updateItem = {
        name: itemName,
        quantity: Number(quantity),
        price: Number(price),
        category,
      };

    setUpdating(true);

    try {
      await api.put(`/inventory/${id}`, updateItem);
      toast.success("Item updated successfully!");
      navigate('/items');
    } catch (error) {
        console.log("Error updating item", error);
        toast.error("Failed to update item");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='w-full px-2'>
      <div className='flex items-center justify-between m-6'>
        <Link to={"/items"} className='btn btn-ghost'>
          <ArrowLeft />
          Back To Items
        </Link>
      </div>

      <div className='card bg-base-300 w-full'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'>Edit Item</h2>
          <form onSubmit={handleUpdate}>
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
              <button type='submit' className='btn btn-primary' disabled={updating} onClick={handleUpdate}>
                {updating ? "Updating..." : "Update Item"}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default EditItemPage
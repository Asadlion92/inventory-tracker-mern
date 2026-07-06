import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const AddItemPage = () => {

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
      const newItem = {
        itemName,
        quantity: Number(quantity),
        price: Number(price),
        category,
      };

  console.log(newItem);
  }

  return (
    <div>
      <div>
        <Link to={"/items"} className='btn btn-ghost'>
          <ArrowLeft />
          Back To Items
        </Link>

        <div className='card bg-base-300'>
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
                <input 
                  type="number"
                  placeholder='Enter price'
                  className='input input-bordered'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Category</span>
                </label>
                <select
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
                  <option value="Other">Other</option>
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
    </div>
  )
}

export default AddItemPage
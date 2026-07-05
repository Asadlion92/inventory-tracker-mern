import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const AddItemPage = () => {

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div>
        <Link to={"/items"} className='btn btn-ghost'>
          <ArrowLeft />
          Back To Items
        </Link>
      </div>
    </div>
  )
}

export default AddItemPage
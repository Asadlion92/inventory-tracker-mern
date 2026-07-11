import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, LoaderIcon, Trash2 } from 'lucide-react';
import api from './../lib/axios';
import { toast } from 'react-hot-toast';

const EditItemPage = () => {

  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleDelete = () => {};

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
        <button onClick={handleDelete} className='btn btn-error btn-outline'>
          <Trash2 className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default EditItemPage
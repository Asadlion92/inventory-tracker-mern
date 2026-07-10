import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const EditItemPage = () => {
  return (
    <div className='w-full px-2'>
      <Link to={"/items"} className='btn btn-ghost'>
        <ArrowLeft />
        Back To Items
      </Link>
    </div>
  )
}

export default EditItemPage
import React from 'react'

const CategoryCard = ({category, totalItems, totalPrice, icon}) => {
  return (
    <div className="card w-72 shadow-xl">
      <div className="card-body items-center text-center">
        {icon}
        <h2 className="card-title">{category}</h2>
        <p>{totalItems} Items</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CategoryCard
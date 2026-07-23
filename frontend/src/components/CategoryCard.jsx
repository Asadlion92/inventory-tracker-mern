import React from 'react'

const CategoryCard = ({category, totalItems, totalPrice}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      {/* <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl" />
      </figure> */}
      <div className="card-body items-center text-center">
        <h2 className="card-title">{category}</h2>
        <p>{totalItems} Items</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CategoryCard
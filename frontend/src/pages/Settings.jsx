import React from 'react'

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
        Settings
      </h1>
      <div className="border border-gray-500 rounded-2xl mt-8 p-5">
        <h2 className="text-lg font-bold">General Settings</h2>
        <h3 className="text-sm mt-4 font-bold">Store Name</h3>
        <input type="text" placeholder="Input Store Name" className='h-10 w-full border border-gray-500 rounded-xl bg-transparent p-4 mt-2'/>
        <div className='flex justify-between items-center mt-6'>
          <div className='w-2/5'>
            <h3 className="text-sm font-bold">Currency</h3>
            <select className='mt-2 h-10 w-full rounded-xl pl-4 border border-gray-500 bg-transparent'>
              <option value="">USD (&#36;)</option>
              <option value="">EUR (&#8364;)</option>
              <option value="">GBP (&#163;)</option>
              <option value="">JPY (&#165;)</option>
              <option value="">INR (&#8377;)</option>
              <option value="">TL (&#8378;)</option>
              <option value="">AED (&#8387;)</option>
              <option value="">SAR (&#1585;&#46;&#1587;)</option>
              <option value="">QAR (&#65020;)</option>
            </select>
          </div>
          <div className='w-2/5'>
            <h3 className="text-sm font-bold">Low Stock Alert Threshold</h3>
            <input type="number" className='mt-2 h-10 w-full rounded-xl pl-4 border border-gray-500 bg-transparent' />
          </div>
        </div>
      </div>
      <div className="border border-gray-500 rounded-2xl mt-8 p-5">
        <h2 className='text-lg font-bold'>Apperance</h2>
        <h3 className='text-sm mt-4 font-bold'>Theme</h3>
        <select className='mt-2 h-10 w-1/2 rounded-xl pl-4 border border-gray-500 bg-transparent'>
          <option value="">Light</option>
          <option value="">Dark</option>
        </select>
      </div>
      <div className="border border-gray-500 rounded-2xl mt-8 p-5">
        <h2 className='text-lg font-bold'>About</h2>
        <p>Version</p>
        <p>1.0.0</p>
      </div>
      <div className='mt-8 flex justify-end'>
        <button className='btn'>Save Changes</button>
      </div>

    </div>
  )
}

export default Settings
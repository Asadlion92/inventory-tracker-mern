import React from 'react'

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
        Settings
      </h1>
      <div className="border border-gray-400 rounded-2xl mt-8 p-5">
        <h2 className="text-lg font-bold">General Settings</h2>
        <h3 className="text-sm mt-4">Store Name</h3>
        <input type="text" placeholder="Input Store Name" />
        <h3 className="text-sm mt-4">Currency</h3>
        <select>
          <option value="">USD ($)</option>
          <option value="">EUR</option>
          <option value="">GBP</option>
          <option value="">JPY</option>
          <option value="">AED</option>
          <option value="">SAR</option>
          <option value="">QAR</option>
        </select>
      </div>
      <div>
        <h2>Apperance</h2>
        <h3>Theme</h3>
        <select>
          <option value="">Light</option>
          <option value="">Dark</option>
        </select>
      </div>
      <div>
        <h2>About</h2>
        <p>Version</p>
        <p>1.0.0</p>
      </div>
    </div>
  )
}

export default Settings
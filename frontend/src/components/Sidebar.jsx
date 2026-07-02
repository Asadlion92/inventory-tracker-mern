import React from 'react'
import { Link, Outlet } from 'react-router'
import { House, Package, Tag, ChartColumn, Settings, Box } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6">
            {/* Page content here */}
            <Outlet />
            <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
            Open Menu
            </label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li className='pointer-events-none'><span><Box className='text-blue-600 size-8'/><p className='text-xl font-bold'>Inventory Tracker</p></span></li>
            <li><Link to={'/'}><span><House /></span>Dashboard</Link></li>
            <li><Link to={'/items'}><span><Package /></span>Items</Link></li>
            <li><Link to={'/categories'}><span><Tag /></span>Categories</Link></li>
            <li><Link to={'/reports'}><span><ChartColumn /></span>Reports</Link></li>
            <li><Link to={'/settings'}><span><Settings /></span>Settings</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
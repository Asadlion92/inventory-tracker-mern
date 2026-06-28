import { Routes, Route } from 'react-router';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import toast from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const App = () => {
  return (
    <div data-theme='night'>
      <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path='/items' element={<Items />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/add' element={<AddItemPage />} />
          <Route path='/edit/:id' element={<EditItemPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
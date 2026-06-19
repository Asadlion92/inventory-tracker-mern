import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div>
    <button onClick={() => toast.error('wrong')}>Click Me</button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add' element={<AddItemPage />} />
        <Route path='/edit/:id' element={<EditItemPage />} />
      </Routes>
    </div>
  )
}

export default App
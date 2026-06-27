import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import toast from 'react-hot-toast';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div data-theme='night'>
      <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<HomePage />} />
          <Route path='/add' element={<AddItemPage />} />
          <Route path='/edit/:id' element={<EditItemPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
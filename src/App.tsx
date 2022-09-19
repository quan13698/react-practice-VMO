import './App.css';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import DashBoard from './components/dashboard/DashBoard';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register/Register';
import { UserProvider } from './contexts/UserContext';
import EditUser from './components/edit_user/edit_user';
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Auth />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/edit-user' element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>

  );
}

export default App;
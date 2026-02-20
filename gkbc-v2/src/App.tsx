import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './Providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import Members from './pages/Members';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <Routes>
            <Route path="Members" element={<Members />} />
            <Route path="Home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/profile/:id" element={<div>Profile Page</div>} />
            {/* Add other routes as needed */}
          </Routes>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
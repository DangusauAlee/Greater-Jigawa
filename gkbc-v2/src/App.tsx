import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './Providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import Members from './pages/Members';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <Routes>
            <Route path="/" element={<Members />} />
            <Route path="/profile/:id" element={<div>Profile Page</div>} />
            {/* Add other routes as needed */}
          </Routes>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
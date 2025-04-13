import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CategoryForm from './components/CategoryForm';
import ProtectedRoute from './protectedRoute/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

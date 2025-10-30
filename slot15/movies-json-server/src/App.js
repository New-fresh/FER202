import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import MovieManager from './pages/MovieManager';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieManager />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

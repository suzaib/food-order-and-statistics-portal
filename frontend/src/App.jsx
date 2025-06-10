import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard';
import VendorDashboard from './components/VendorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard/>
            </ProtectedRoute>
          }
          />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute roleRequired="vendor">
              <VendorDashboard/>
            </ProtectedRoute>
          }
          />
      </Routes>
    </Router>
  )
}

export default App

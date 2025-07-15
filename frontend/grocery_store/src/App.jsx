import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import AdminHome from './components/Admin/AdminHomePage';
import AdminUserPage from './components/DatabaseAdmin/AdminUserPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import CategoryPage from "./components/Categories/CategoryPage";
import SearchResult from "./components/SearchResult/SearchResult";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Payment from "./components/Payment/Payment";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import OrderSuccess from "./components/Payment/OrderSuccess";

function App() {

  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminHome />
              </ProtectedRoute>
            } />
            <Route path="/database_admin/users" element={
              <ProtectedRoute requiredRole="database_admin">
                <AdminUserPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/:categoryName" element={<AdminHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success-order" element={<OrderSuccess />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  )
}

export default App

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
import DashboardLayout from "./components/Admin/DashboardLayout";
import Product from "./components/Admin/Pages/Product";
import Customer from "./components/Admin/Pages/Customer";
import Order from "./components/Admin/Pages/Order";
import { AdminPageProvide } from "./context/AdminPageContext";

function App() {

  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminPageProvide>
                  <DashboardLayout />
                </AdminPageProvide>
              </ProtectedRoute>
            }>
              <Route index element={<AdminHome />} />
              <Route path="products" element={<Product />} />
              <Route path="customers" element={<Customer />} />
              <Route path="orders" element={<Order />} />
            </Route>

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

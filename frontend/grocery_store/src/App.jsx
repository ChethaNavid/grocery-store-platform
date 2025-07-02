import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import AdminHome from './components/Admin/AdminHomePage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import CategoryPage from "./components/Categories/CategoryPage";
import CategoryPageAdmin from "./components/Admin/CategoryPageAdmin";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/:categoryName" element={<CategoryPageAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        
      </Routes>
    </Router>
  )
}

export default App

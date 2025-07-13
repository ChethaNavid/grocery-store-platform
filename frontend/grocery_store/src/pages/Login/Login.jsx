import { React, useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/validateEmail';
import axiosInstance from '../../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!identifier) {
        setError("Please enter a valid email address or phone number.");
        return;
    }

    if(!password) {
        setError("Please enter the password.")
        return;
    }
    setError("");

    const isEmail = validateEmail(identifier);
    const loginData = isEmail
    ? { email: identifier, password } 
    : { phoneNumber: identifier, password }

    // Login API call
    try {
        const response = await axiosInstance.post("/login", loginData);

        if(response.data && response.data.token) {
            const token = response.data.token;
            localStorage.setItem("token", response.data.token)
            setUserInfo(response.data.user);

            const decoded = jwtDecode(token);
            if(decoded.role === "admin") {
                navigate('/admin');
            } else if (decoded.role === "database_admin") {
                navigate('/database_admin/users');
            } else {
                navigate('/')
            }
        }
    } catch (error) {
        if(error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            console.error(error)
            setError("An unexpected error occurred. Please try again.")
        }
    }
  }
  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
          <div className='w-96 border rounded bg-white px-7 py-10'>
              <form onSubmit={handleLogin}>
                  <h4 className='text-2xl mb-7'>Login</h4>

                  <input 
                      type='text' 
                      placeholder='Email or Phone Number' 
                      className='input-box'
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                  />

                  <PasswordInput 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />

                  {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                  <button type='submit' className='auth-btn'>Login</button>

                  <p className='text-sm text-center mt-4'>
                      Not registered yet? {""}
                      <Link to="/signup" className='font-medium text-primary underline'>
                          Create an Account
                      </Link>
                  </p>
              </form>

          </div>
      </div>
    </>
  )
}

export default Login
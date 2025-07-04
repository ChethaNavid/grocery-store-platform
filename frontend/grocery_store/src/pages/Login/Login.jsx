import { React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/validateEmail';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    if(!password) {
        setError("Please enter the password.")
        return;
    }
    setError("");

    // Login API call
    try {
        const response = await axiosInstance.post("/users/login", {
            email: email,
            password: password,
        })

        if(response.data && response.data.token) {
            localStorage.setItem("token", response.data.token)
            navigate('/')
        }
    } catch (error) {
        if(error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("An unexpected error occurred. Please try again.")
        }
    }
  }
  return (
    <>
      <div className='flex justify-center items-center mt-20'>
          <div className='w-96 border rounded bg-white px-7 py-10'>
              <form onSubmit={() => {}}>
                  <h4 className='text-2xl mb-7'>Login</h4>

                  <input 
                      type='text' 
                      placeholder='Email' 
                      className='input-box'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
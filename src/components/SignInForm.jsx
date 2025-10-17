import React, { useState } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignInForm() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const [message, setMessage] = useState  ('');
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try{
      const response = await axios.post('http://localhost/talent&career/employeeBackend/auth/login.php', state, {withCredentials: true})
      
      if(response.data.isAuthenticated){
        console.log(response)
        navigate('/dashboard');
      }else{
        setMessage(response.data.error)
        console.log(response.data)
      }
    }catch(error){

      console.log(error);
    }
    
  };

  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="a social">
            <FacebookIcon />
          </a>
          <a href="#" className="a social">
            <GoogleIcon />
          </a>
        </div>
        <span className="span">or use your account</span>
        <input
          className="input"
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a className="a" href="#">Forgot your password?</a>
        <button className="button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

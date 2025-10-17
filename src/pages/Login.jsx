import React, { useState } from "react";
import '../../style/login.css'
import SignInForm from '../components/SignInForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';

export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  
    return (
    <div className="main-login-form">
      <h2>Employee Portal</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Sign In to your account</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
            
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Create an account</h1>
              <p className="p">Join us today! Create your account to get started.</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

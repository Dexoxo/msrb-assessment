import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [credentials, setCredentials] = useState({username: "", password: "", confirmPassword: ""});
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/userAuth/createuser" , {
      mode: 'cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: credentials.username, password: credentials.password})
  });
    const json = await response.json()
    console.log(json);
    if (json.success){
        localStorage.setItem('token', json.authtoken); 
        navigate("/userhome");
    }
    else{
        setError(true);
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
<div className="formContainer">
      <div className="formWrapper">
        <span className="logo">User Register</span>
        <span className="title">Enter Your Credentials to sign up</span>
        <form onSubmit={handleSubmit}>
          <input type="username" onChange = {onChange} value = {credentials.username} name="username" placeholder="Username" />
          <input type="password" onChange = {onChange} value = {credentials.password} name="password" placeholder="password" />
          <input type="password" onChange = {onChange} value = {credentials.confirmPassword} name="confirmPassword" placeholder="Confirm password" />
          <button>Sign up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>You have an account? <Link to="/userlogin">Login</Link></p>
        <p>Are you an Admin? Login here <Link to="/adminlogin">Admin Login</Link></p>
      </div>
    </div>
  )
}

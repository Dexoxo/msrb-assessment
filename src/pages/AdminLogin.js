import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [credentials, setCredentials] = useState({username: "", password: ""});
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/adminAuth/login", {
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
        navigate("/adminhome");
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
        <span className="logo">Admin Login</span>
        <span className="title">Enter Your Credentials</span>
        <form onSubmit={handleSubmit}>
          <input type="username" onChange = {onChange} value = {credentials.username} name="username"  placeholder="Username" />
          <input type="password" onChange = {onChange} value = {credentials.password} name="password"  placeholder="password" />
          <button>Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/adminregister">Register</Link></p>
        <p>Are you an User? Login here <Link to="/userlogin">User Login</Link></p>
      </div>
    </div>
  )
}

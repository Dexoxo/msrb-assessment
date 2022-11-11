import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import UserRegister from './pages/UserRegister'
import AdminRegister from './pages/AdminRegister'
import Userhome from './components/Userhome.js'
import AdminHome from './components/AdminHome.js'
import "./style.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/">
        <Route exact path="/" element={<UserLogin />} />
        <Route exact path="/userlogin" element={<UserLogin />} />
        <Route exact path="adminlogin" element={<AdminLogin />} />
        <Route exact path="userregister" element={<UserRegister />} />
        <Route exact path="adminregister" element={<AdminRegister />} />
        <Route exact path="/userhome" element={<Userhome />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

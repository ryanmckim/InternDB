import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Company from "./components/Company/Company";
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/company/:id" element={<Company/>}></Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;

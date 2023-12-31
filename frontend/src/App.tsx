import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Company from "./components/CompanyPage/CompanyPage";
import Profile from './components/ProfilePage/ProfilePage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/company/:id" element={<Company/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

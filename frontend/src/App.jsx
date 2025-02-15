import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/frontpage/Homepage';
import Login from './components/LogIn/Login';
import Signup from './components/Signup/Signup';
import Investments from './components/Investments/Investments';
import InvestmentDetail from './components/InvestmentDetail/InvestmentDetail';
import UserProfile from './components/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <Router>
         <Navbar /> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/investment/:symbol" element={<InvestmentDetail />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;


import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='nav'>
      <ul className="menu-1">
        <li className='nav-logo cursor-pointer'>
        <Link to="/">Eco mitra</Link>
      
          </li>
        <li><Link to="/investments"><button>Investments</button></Link></li>
        <li><Link to="/#about"><button>About Us</button></Link></li>
      </ul>
      <ul className="nav-menu">
        <li><Link to="/login"><button className='nav-signup'>Log In</button></Link></li>
        <li><Link to="/signup"><button className='nav-login'>Sign Up</button></Link></li>
        <li><Link to="/contact"><button className='nav-contact'>Contact Us</button></Link></li>
      </ul>
    </div>
  );
}

export default Navbar;

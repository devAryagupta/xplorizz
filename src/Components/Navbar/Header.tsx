import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
            <div className="nav-wrapper">
              <h1 className="site-title">Xplorizz</h1>
              <nav>
                <ul className="nav-links">
                  <li><Link to="/homepage">Home</Link></li>
                  <li><a href="#destinations">Destinations</a></li>
                  <li>
                    <Link
                      to="/experiences"
                      className="text-gray-800 hover:text-gray-600"
                    >
                      Experiences
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides" className="text-gray-800 hover:text-gray-600">
                      Local Guides
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-800 hover:text-gray-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookings" className="text-gray-800 hover:text-gray-600">
                      Bookings
                    </Link>
                  </li>
                </ul>
              </nav>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </header>
  );
}
export default Header;
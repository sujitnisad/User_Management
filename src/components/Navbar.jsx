import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice.js";
import "./Navbar.css";
useSelector;
const Navbar = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const userscount = useSelector((state) => state.app.users);

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  // const [activeNav, setActiveNav] = useState("/");

  // const handleNavClick = (path) => {
  //   setActiveNav(path);
  // };
  console.log(userscount);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand">LUCID</h4>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All Users({userscount.length})
                </Link>
              </li>
            </ul>

            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

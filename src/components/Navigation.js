import React from "react";
import { Link } from "react-router-dom";
import "styles/Navigation.scss";

const Navigation = ({ userObj }) => {
  return (
    <nav className="Navigation-container">
      <ul>
        <li>
          <Link to="/" className="Navigation-link">
            홈
          </Link>
        </li>
        <li>
          <Link to="/profile" className="Navigation-link">
            {userObj.displayName}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

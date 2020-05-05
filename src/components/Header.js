import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <div className="header">
        <h1>Survey</h1>
        <button>
          <Link  to='/'>Home</Link>
        </button>
        <button>
          <Link to="/signin">Sign In</Link>
        </button>
      </div>
    </React.Fragment>
  )
}

export default Header;
import React from "react";
import { BsFillHouseHeartFill, BsFillHouseXFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
const Nav = () => {
  const navigate = useNavigate();
  const handlesignOut = async () => {
    try {
      await signOut(auth);
      alert(`user has signed out`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="nav">
      <div className="header">
        Welcome To Future Microsoft Developers Todo List
      </div>
      <div className="btn-container">
        <Link to="/signin" className="btn-2">
          <button className="btn">
            Sign In{" "}
            <span>
              <BsFillHouseHeartFill className="test" />
            </span>
          </button>
        </Link>
        <button className="btn" onClick={handlesignOut}>
          Sign Out{" "}
          <span>
            <BsFillHouseXFill />
          </span>
        </button>
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

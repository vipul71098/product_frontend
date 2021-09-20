import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
const logout = (e) => {
    localStorage.removeItem('login');
    }
 var islogin = false;
 var x = localStorage.getItem("login");
 if(x) {
  islogin = true
 }
 console.log('islogin', islogin);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand">
            <h2>React product App</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
          {islogin ?
          <Link style={{ margin: '10px' }} className="btn btn-light btn-outline-light" to="/product/add">
            Add prodcut
          </Link>
          : null}
          {islogin ? null :
            <Link style={{ margin: '10px' }} className="btn btn-light btn-outline-light" to="/register">
            Register
          </Link>
          }
          {islogin ?
            <Link  style={{ margin: '10px' }} onClick={() => logout()} className="btn btn-light btn-outline-light" to="/">
            logout
          </Link> :
            <Link  style={{ margin: '10px' }}  className="btn btn-light btn-outline-light" to="/">
            login
          </Link>
           }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

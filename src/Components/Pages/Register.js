import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Layout/Navbar";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = userdata;

  /**
   * get input box value and set to the state value
   * @param {object} e
   */
  const inputLoad = (e) => {
    console.log('eeeeeeeee', e);
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value
    });
  };

  /**
   * append form value into the formData and pass formData into insert Api
   * @param {object} e
   */

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('userdata', userdata);
    axios
      .post(
        "https://product-node-app-task.herokuapp.com/api/v1/auth/register",
        userdata,
      )
      .then(() => history.push("/"))
      .catch((err) => alert(err));
  };
  return (
  <>
  <Navbar />
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Register</h2>
        <form
          onSubmit={(e) => onSubmit(e)}
          method="post"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="username"
              required
              value={username}
              name="username"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your email"
              required
              value={email}
              name="email"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter Your password"
              required
              value={password}
              name="password"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>

          <button className="btn btn-primary btn-block">Register</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;

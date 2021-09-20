import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Navbar from "./Components/Layout/Navbar";
import AddProdcut from "./Components/Products/AddProduct";
import ViewProduct from "./Components/Products/ViewProduct";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const rememberMe = localStorage.getItem('login');

  useEffect(() => {
    console.log('rememberme', rememberMe);
  }, []);
  return (
   console.log('tetetete'),
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/product/add" component={AddProdcut} />
        <Route exact path="/product/view/:id" component={ViewProduct} />
      </Switch>
    </Router>
  );
}

export default App;

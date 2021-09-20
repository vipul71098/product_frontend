import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import backimg from '../../assests/images/back.png';

const AddProdcut = () => {
  let history = useHistory();
  const [prodcut, setprodcut] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
  });
  const { name, desc, price, image } = prodcut;
  var upImg;

  /**
   * get input box value and set to the state value
   * @param {object} e
   */
  const inputLoad = (e) => {
    setprodcut({
      ...prodcut,
      [e.target.name]: e.target.value || e.target.files[0].name,
    });
  };

  /**
   * append form value into the formData and pass formData into insert Api
   * @param {object} e
   */

  let fd = new FormData();
  const inputLoadFile = (e) => {
    let imgs = e.target.files[0];
    upImg = e.target.files[0].name;
    fd.append("image", imgs);
    fd.append("name", name);
    fd.append("desc", desc);
    fd.append("price", price);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9010/api/v1/product/insertproduct",
        fd
      )
      .then(() => history.push("/home"))
      .catch(() => console.log("not submitted........"));
  };
  return (
  <>
  <Navbar />
    <div className="container">
    <Link exact to="/home"><img src={backimg} style={{float:'left', marginLeft: '40px'}} width='50' height='50' /></Link>
      <div style={{marginTop: '100px'}} className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Product</h2>
        <form
          onSubmit={(e) => onSubmit(e)}
          method="post"
          enctype="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your product Name"
              required
              value={name}
              name="name"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your prodcut desc"
              required
              value={desc}
              name="desc"
              rows="5"
              style={{ resize: "none" }}
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
              className="form-control form-control-lg"
              placeholder="Enter Your price of prodcuts"
              required
              value={price}
              name="price"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              className="form-control form-control-lg"
              name="image"
              required
              value={upImg}
              onChange={(e) => {
                inputLoadFile(e);
              }}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Product</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProdcut;

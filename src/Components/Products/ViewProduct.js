import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import backimg from '../../assests/images/back.png';
import { useHistory, useParams, Link, Redirect } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();

  const [product, setproduct] = useState({
    name: "",
    desc: "",
    price: '',
  });
  const inputLoad = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const intialLoad = (e) => {
    axios
      .get(
        `https://product-node-app-task.herokuapp.com/api/v1/product/getsingleproduct/${id}`
      )
      .then((response) => {
        setproduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://product-node-app-task.herokuapp.com/api/v1/product/updateproduct/${id}`,
        product
      )
      .then(() => alert('product Udated.......'))
      .catch(() => console.log("not submitted........"));
  };
  useEffect(() => {
    intialLoad();
  }, []);
  return (
    <div class="mt-4">
    <Link exact to="/home"><img src={backimg} style={{float:'left', marginLeft: '40px'}} width='50' height='50' /></Link>
      <section style={{paddingTop: '20px'}} class="bg-half bg-light d-table w-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <div class="page-next-level">
                <h1>{product.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-6">
              <div class="card product product-detail border-0 shadow rounded">
                <img
                  src={product.image}
                  style={{ height: "350px" }}
                  class="img-fluid rounded-top"
                  alt={product.title}
                  title={product.name}
                />
              </div>
              <div class="card-body content mt-3">
              <label style={{fontWeight: 'bold', fontSize:'28px'}}>Price : {product.price}</label>{" "}
                <h4 class="text-muted" style={{ letterSpacing: '1px'}}>{product.desc}</h4>

                <div class="mt-4">
                  <div>
                    <label style={{fontWeight: 'bold', fontSize:'20px'}}>update name :</label>{" "}
                  </div>
                  <div style={{display: 'grid'}}>
                     <input type="text"
                        name="name"
                        onChange={(e) => {
                          inputLoad(e);
                        }}
                        value={product.name}
                      />{" "}

                      < br />
                      <label style={{fontWeight: 'bold', fontSize:'20px'}}>update price :</label>{" "}
                      <input type="number"
                       onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                          }
                        }}
                        name="price"
                        onChange={(e) => {
                          inputLoad(e);
                        }}
                        value={product.price}
                      />{" "}

                      < br />
                      <label style={{fontWeight: 'bold', fontSize:'20px'}}>update desc :</label>{" "}
                      <textarea style={{resize: 'none'}}
                        name="desc" rows='5'
                        onChange={(e) => {
                          inputLoad(e);
                        }}
                        value={product.desc}
                      ></textarea>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <button style={{width: '300px'}}
                        class="btn btn-primary"
                        onClick={(e) => {
                          onSubmit(e);
                        }}
                      >
                        {" "}
                        Update{" "}
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProduct;

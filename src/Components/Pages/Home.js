import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setblog] = useState([]);
  const [pager, setpager] = useState([]);
  const [pageOfItems, setpageOfItems] = useState([]);


  useEffect(() => {
    onloadData();
    // onloadPagination();
  }, []);
  const onloadData = async () => {
    await axios
      .get("https://product-node-app-task.herokuapp.com/api/v1/product/getproduct")
      .then((response) => {
        settotlen(response.data.length);
        console.log('total', response.data.length);
        setblog(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

   const fetchUsers = async (skip) => {

    await axios
      .get(`https://product-node-app-task.herokuapp.com/api/v1/product/page?page=${skip}`)
        .then(response => {
            setpageOfItems(response.data.results);
            setlen(response.data.results.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteblog = (id) => {
    axios
      .delete(
        `http://localhost:9010/api/v1/product/deleteproduct/${id}`
      )
      .then((response) => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const [skip, setSkip] = useState(1);
    const [len, setlen] = useState(0);
    const [totlen, settotlen] = useState(0);

    const nextPage = () => {
        setSkip(skip + 1)
    }

    const previousPage = () => {
       if (skip === 0) {
         setSkip(skip)
       }else {
         setSkip(skip-1);
      }

    }

    useEffect(() => {
        fetchUsers( skip)
    }, [skip])

  return (
    console.log('pageOfItems', pageOfItems, len),
    <div>
    <Navbar />
      <section class="section">
        <div class="container">
          <div class="row">
            {pageOfItems.map((blog, index) => (
              <div class="col-lg-4 col-md-6 mb-4 pb-2">
                <div class="card blog rounded border-0 shadow overflow-hidden">
                  <div class="position-relative">
                    <img
                      src={blog.image}
                      height="200"
                      class="card-img-top"
                      alt="How to Build a Sales Pipeline?"
                      title="How to Build a Sales Pipeline?"
                    />
                    <div class="overlay rounded-top bg-dark"></div>
                  </div>
                  <div class="card-body content">
                    <h5>
                      <a
                        class="card-title title text-dark"
                      >
                        {blog.name}
                      </a>
                      <p> Rs : {blog.price}</p>
                    </h5>
                    <div class="post-meta d-flex justify-content-between mt-3">
                      <ul class="list-unstyled mb-0">
                        <Link
                          class="btn btn-primary mr-2"
                          exact
                          to={`/product/view/${blog._id}`}
                        >
                          View
                        </Link>
                      </ul>

                      <Link
                        class="btn btn-danger"
                        onClick={() => deleteblog(blog._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <center> <h3>Total number of product : {totlen}</h3></center>
          {skip === 1 ? null : <button  class="btn btn-primary mr-2"  style={{ float: 'left', marginBottom: '30px'}} onClick={previousPage}> previous Page </button> }

           {len < 12 ? null : <button   class="btn btn-primary mr-2" style={{ float: 'right', marginBottom: '30px'}} onClick={nextPage}> next Page </button> }

        </div>
      </section>
    </div>
  );
};

export default Home;

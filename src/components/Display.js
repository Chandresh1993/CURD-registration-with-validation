import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Display = () => {
  const [display, setDisplay] = useState([]);

  // Getdata from api
  async function getData() {
    await axios
      .get("http://localhost:3004/employee")
      .then((response) => {
        setDisplay(response.data);
      })
      .catch((err) => {
        console.log("this is Display data error", err);
      });
  }

  // USeEffect

  useEffect(() => {
    getData();
  }, []);

  // Delete function

 async function handleDelete(id) {
   await axios.delete(`http://localhost:3004/employee/${id}`).then(() => {
      getData();
    });
  }

  return (
    <div className="row bg-success">
      <h1 className="p-3 mb-2 bg-success text-white">Registration Data</h1>
      <div className="col-md-12 bg-success ">
        <table className="table  table-striped table-bordered table-hover table-dark ">
          <thead className="">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {display.map((items, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.password}</td>
                  <td>
                    <Link
                      to="/"
                      type="button"
                      className="btn btn-primary mx-2"
                    >
                      Create
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        if (window.confirm("are you sure to delete Data??")) {
                          handleDelete(items.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit/${items.id}`}
                      type="button"
                      className="btn btn-warning mx-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Display;

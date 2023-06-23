import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  // Navigate Hook
  const navigate = useNavigate();
  // storeing all input field into one useState.
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // submit data to api
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, contact } = inputValues;
    if (!name || !email || !contact) {
      alert("please fill in all fields");
      return;
    } else {
      axios
        .post(`http://localhost:3004/employee`, inputValues)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log("this is post request error ", err);
        });
    }
  }

  return (
    <div className="container ">
      <h1 className="p-3 mb-2 bg-danger text-dark">Enter Employee Details</h1>
      <div className="py-3 border border-dark p-3 mb-2 bg-success text-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter your Name"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Please Enter your Email"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Please Enter your Contact"
              name="contact"
              value={inputValues.contact}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-warning" type="submit">
              Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

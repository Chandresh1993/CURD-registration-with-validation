import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // Navigate Hook
  const navigate = useNavigate();

  // Params Hook
  const { id } = useParams();
  // storing all input fields into one useState.
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // submit data to API
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = inputValues;
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    } else {
      axios
        .put(`http://localhost:3004/employee/${id}`, inputValues)
        .then(() => {
          navigate("/create");
        })
        .catch((err) => {
          console.log("This is a PUT request error ", err);
        });
    }
  }

  
// Get the data from api 
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3004/employee/${id}`);
    setInputValues(result.data);
  };

  return (
    <div className="container">
      
      <div className="py-3 border border-dark p-3 mb-2 bg-info text-white">
      <h1 className="p-3 mb-2 bg-success text-dark border border-5  border-dark">Edit Registration Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"></div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Please enter your Name"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Please enter your Email"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Please enter your Password"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-warning" type="submit">
              Edit Button
            </button>
            <Link to="/" className="btn btn-secondary" type="submit">
              Registration page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

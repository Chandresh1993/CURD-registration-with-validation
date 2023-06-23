import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  // Navigate Hook
  const navigate = useNavigate();
  // storing all input field into one useState.
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Error State
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    // Passing values for validation
    setFormErrors(validate(inputValues));
    setIsSubmit(true);

    const { name, email, password } = inputValues;
    
    // Form validation
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    } else {
      axios
        .post(`http://localhost:3004/employee`, inputValues)
        .then(() => {
          navigate("/create");
        })
        .catch((err) => {
          console.log("this is post request error", err);
        });
    }
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(inputValues);
    }
  }, [formErrors]);

  // Validation function
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="">Signed in successfully</div>
      ) : (
        <pre></pre>
      )}

      <div className="py-3 border border-dark p-3 mb-2 bg-info text-white">
        <form onSubmit={handleSubmit}>
          <h1 className="p-3 mb-2 bg-info text-dark border border-5 border-dark ">USER REGISTRATION  FORM</h1>
          <div className="mb-3"></div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter your UserName"
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
            />
            <p className="text-start text-danger">{formErrors.name}</p>
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
            <p className="text-start text-danger">{formErrors.email}</p>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Please Enter your password"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
              maxLength="10"
              minLength="5"
            />
            <p className="text-start text-danger">{formErrors.password}</p>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-warning" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

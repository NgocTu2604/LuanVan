import React, { useState } from "react";
import "../asset/css/Register.css";
import { API } from "../API";

const initFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function RegisterPage(props) {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const { setViewRegister, setViewLogin } = props;

  // const {setViewLogin, setViewRegister} = props
  // console.log(setViewLogin, setViewLogin);

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.firstName)) {
      error["firstName"] = "First name is required";
    }
    if (isEmptyValue(formValue.lastName)) {
      error["lastName"] = "Last name is required";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is required";
    } else {
      if (!isEmailValid(formValue.email)) {
        error["email"] = "Email is invalid";
      }
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is required";
    }

    if (isEmptyValue(formValue.confirmPassword)) {
      error["confirmPassword"] = "Confirm password is required";
    } else if (formValue.confirmPassword !== formValue.password) {
      error["confirmPassword"] = "Confirm password not match";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const values = {
        name: formValue.firstName + formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        id_card_number: null,
        phone_number: null,
        log_count: null,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      await fetch(`${API}user/register`, requestOptions)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("Register success");
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("form not validate");
    }
  };
  console.log(formError);

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Register Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first-name" className="form-label">
              First name
            </label>
            <input
              id="first-name"
              className="form-control"
              type="text"
              name="firstName"
              value={formValue.firstName}
              onChange={handleChange}
            />
            {formError.firstName && (
              <div className="error-feedback">{formError.firstName} </div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="last-name" className="form-label">
              Last name
            </label>
            <input
              id="last-name"
              className="form-control"
              type="text"
              name="lastName"
              value={formValue.lastName}
              onChange={handleChange}
            />
            {formError.lastName && (
              <div className="error-feedback">{formError.lastName} </div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              className="form-control"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            {formError.email && (
              <div className="error-feedback">{formError.email} </div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
            {formError.password && (
              <div className="error-feedback">{formError.password} </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              className="form-control"
              type="password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
            />
            {formError.confirmPassword && (
              <div className="error-feedback">{formError.confirmPassword} </div>
            )}
          </div>
          <button type="submit" className="submit-btn form-control">
            Đăng ký
          </button>
        </form>
        <p onClick={()=>{setViewLogin(true); setViewRegister(false)}}>
           Đã có tài khoản ? Nhấn để đăng nhập
        </p>
      </div>
    </div>
  );
}

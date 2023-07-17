// import { Link, useNavigate } from "react-router-dom";
import { API } from "../API";
import "../asset/css/Login.css";
import React, { useEffect, useState } from "react";

const initFormValue = {
  email: "",
  password: "",
};
const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

export default function LoginPage(props) {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const { setViewRegister, setViewLogin } = props;
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const values = {
        email: formValue.email,
        password: formValue.password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      await fetch(`${API}user/login`, requestOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          console.log(json);
          if (!json.access_token) {
            alert("Email or pass not right");
          } else {
            // console.log(json.data[0]);
            setUser(json.user);
            localStorage.setItem('user', JSON.stringify(json.user));
            setViewLogin(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("form not validate");
    }
  };


  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const validateForm = () => {
    const error = {};

    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is required";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is required";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    if(user !== {})
    {
      console.log(user);
      
    }
  }, [user]);

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="title">Login Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={formValue.email}
              onChange={handleChange}
              id="email"
              className="form-control"
              type="email"
              name="email"
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
              // value={pass}
              // onChange={(event) => setPass(event.target.value)}
              value={formValue.password}
              onChange={handleChange}
              id="password"
              className="form-control"
              type="password"
              name="password"
            />
            {formError.password && (
              <div className="error-feedback">{formError.password} </div>
            )}
          </div>
          <button type="submit" className="submit-btn form-control">
            Đăng nhập
          </button>
        </form>
        <p
          onClick={() => {
            setViewRegister(true);
            setViewLogin(false);
          }}
        >
          Chưa có tài khoản ? Nhấn để đăng ký
        </p>
      </div>
    </div>
  );
}

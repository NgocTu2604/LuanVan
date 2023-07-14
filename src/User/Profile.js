import React, { useState, useEffect } from "react";
import "../asset/css/Profile.css";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { useParams } from "react-router-dom";

function Profile() {
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const [value, setValue] = useState("one");

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API}user/getuserbyid/${userID}`);
      const getData = await res.json();
      setUser(getData.data[0]);
    };
    getUser();
  }, [userID]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profile-page">
      <div className="profile-form-container">
        <Box sx={{ width: "100%", margin: "50px 0 0 0" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="THÔNG TIN THÀNH VIÊN" />
            <Tab value="two" label="LỊCH SỬ MUA VÉ" />
          </Tabs>
        </Box>
        {value === "one" ? (
          <>
            <h1 className="profile-title">THÔNG TIN THÀNH VIÊN</h1>
            <form>
              <div className="profile-item">
                <label htmlFor="user-name" className="profile-form-label">
                  Họ & Tên
                </label>
                <input
                  id="user-name"
                  className="profile-form-control"
                  type="text"
                  value={user.name}
                />
              </div>
              <div className="profile-item">
                <label htmlFor="phone" className="profile-form-label">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  className="profile-form-control"
                  type="text"
                  name="phone"
                  value={user.phone_number}
                />
              </div>
              <div className="profile-item">
                <label htmlFor="CCCD" className="profile-form-label">
                  CCCD
                </label>
                <input
                  id="CCCD"
                  className="profile-form-control"
                  type="text"
                  name="CCCD"
                />
              </div>

              <div className="profile-item">
                <label htmlFor="email" className="profile-form-label">
                  Email
                </label>
                <input
                  id="email"
                  className="profile-form-control"
                  type="email"
                  name="email"
                  disabled="true"
                  value={user.email}
                />
              </div>

              <button type="submit" className="">
                Xác nhận
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="profile-title">THÔNG TIN GIAO DỊCH</h1>
            <div className="wrap-bill">
              <div className="bill-content">
                <div className="bill">
                  <tr>
                    <th>Loại vé</th>
                    <th>Số lượng mua</th>
                    <th>Giá (VNĐ)</th>
                    <th>Tổng (VNĐ)</th>
                    
                  </tr>
                  <tr>
                    <td>Tổng</td>
                    <td>Tổng</td>
                    <td>Tổng</td>
                    <td>Tổng</td>
                  </tr>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from "react";
import "../asset/css/Profile.css";
import {
  Box,
  Tab,
  Tabs,
  Switch,
  Paper,
  Collapse,
  FormControlLabel,
  // Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function Profile() {
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const [value, setValue] = useState("one");
  const [user, setUser] = useState([]);
  const [bill, setBill] = useState([]);
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [valueUpdate, setValueUpdate] = useState({
    name: user.name || "",
    phone: user.phone_number || "",
    id_card: user.id_card_number || "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API}user/getuserbyid/${userID}`);
      const getData = await res.json();
      setValueUpdate({
        name: getData.data[0].name,
        phone: getData.data[0].phone_number,
        id_card: getData.data[0].id_card_number,
        email: getData.data[0].email,
      });
      setUser(getData.data[0]);
    };
    getUser();
  }, [userID]);

  useEffect(() => {
    const getBill = async () => {
      const res = await fetch(`${API}bill/getbillbyuser/${userID}`);
      const getData = await res.json();
      setBill(getData.data);
    };
    getBill();
  }, [userID]);
  // console.log(userID);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    const values = {
      name: valueUpdate.name,
      id_card_number: valueUpdate.id_card,
      phone_number: valueUpdate.phone,
      email: valueUpdate.email,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch(`${API}user/updateProfile/${userID}`, requestOptions)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Update profile success");
        }
      })
      .catch((error) => console.log(error));
  };

  //hide pass
  const [checked, setChecked] = React.useState(false);

  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box component="svg" sx={{ width: 100, height: 100 }}>
        <Box
          component="polygon"
          sx={{
            fill: (theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
          }}
          points="0,100 50,00, 100,100"
        />
      </Box>
    </Paper>
  );
  const handleChangePass = () => {
    setChecked((prev) => !prev);
  };
  const handleChangeUpdate = (event) => {
    const { value, name } = event.target;
    setValueUpdate({
      ...valueUpdate,
      [name]: value,
    });
  };
  const handleDetail = (id) => {
    navigate(`/billdetail/${id}`);
  };

 
  const handleUpdatePass = async(e)=>{
    e.preventDefault();
    const value = {
      password: oldPass ,
      new_password: newPass,
      password_confirmation: newPass
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    };
    await fetch(`${API}user/changepassword/${userID}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          alert("TC");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="profile-page">
      <div className="profile-form-container">
        <Box sx={{ width: "100%", margin: "10px 0 0 0" }}>
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
                  disabled="true"
                  id="user-name"
                  className="profile-form-control"
                  type="text"
                  name="name"
                  value={valueUpdate.name}
                  onChange={handleChangeUpdate}
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
                  onChange={handleChangeUpdate}
                  value={valueUpdate.phone}
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
                  name="id_card"
                  onChange={handleChangeUpdate}
                  value={valueUpdate.id_card}
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

              <FormControlLabel
                control={
                  <Switch checked={checked} onChange={handleChangePass} />
                }
                label="Đổi mật khẩu"
              />
              <Box
                sx={{
                  "& > :not(style)": {
                    display: "flex",
                    justifyContent: "space-around",
                    height: 120,
                    width: 300,
                  },
                }}
              >
                <div>
                  <Collapse in={checked}>
                    <div className="profile-item">
                      <label htmlFor="CCCD" className="profile-form-label">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        id="CCCD"
                        className="profile-form-control"
                        type="text"
                        name="CCCD"
                        value={oldPass}
                        onChange={(e)=>setOldPass(e.target.value)}
                      />
                    </div>
                    <div className="profile-item">
                      <label htmlFor="CCCD" className="profile-form-label">
                        Mật khẩu mới
                      </label>
                      <input
                        id="CCCD"
                        className="profile-form-control"
                        type="text"
                        name="CCCD"
                        value={newPass}
                        onChange={(e)=>setNewPass(e.target.value)}
                      />
                    </div>
                    <div className="profile-change">
                      <button onClick={handleUpdatePass} type="submit" className="btn-change">
                        Thay đổi
                      </button>
                    </div>
                  </Collapse>
                </div>
              </Box>
              <div className="profile-submit">
                <button
                  onClick={handleUpdate}
                  type="submit"
                  className="btn-update"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="profile-title">THÔNG TIN GIAO DỊCH</h1>
            <div className="wrap-bill">
              <div className="bill-content">
                <div className="bill">
                  <tr>
                    <th>Hình thức thanh toán</th>
                    <th>Ngày</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Tổng tiền(VNĐ)</th>
                    <th>Thao tác</th>
                  </tr>
                  {bill?.map((item, index) => {
                    return (
                      <tr>
                        <td style={{ textAlign: "center" }}>{item.pay_mode}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.created_at}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.name}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.total_price}
                        </td>
                        <td>
                          <button onClick={() => handleDetail(item.id)}>
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

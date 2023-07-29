import React, { useEffect, useRef, useState } from "react";
import "../../asset/css/Confirm.css";
import { API } from "../../API";
import { useNavigate } from "react-router-dom";

function Confirm(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { setShowBack, showBack, setShowSeat, setConfirm, resBuyTicket } =
    props;
  const [timer, setTimer] = useState(900);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const handleStart = () => {
    // start button logic here
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
      if (timer === 1) {
        handleDeleteBill(resBuyTicket.data.id);
        alert("Bạn đã hết thời gian mua vé");
        navigate("/");
      }
      clearInterval(countRef.current);
    }, 1000);
    // clearInterval(countRef.current);
  };
  // console.log(timer);
  const handleReset = () => {
    // Reset button logic here

    setIsActive(false);
    setIsPaused(false);
    setTimer(900);
  };
  useEffect(() => {
    handleStart();
  }, [timer]);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
  };

  const handleUpdateBill = async (id) => {
    const value = {
      bill_status_id: 2,
      pay_mode: "MoMo",
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    };
    await fetch(`${API}bill/updatebill/${resBuyTicket.data.id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          alert("Mua vé thành công")
          navigate("/")
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBill = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bill_id: id }),
    };
    await fetch(`${API}bill/delete`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleBeforeUnload = async () => {
    // Thực hiện cuộc gọi API trước khi trang bị reload
    await handleDeleteBill(resBuyTicket.data.id);
  };

  // Gán Event Listener cho sự kiện 'beforeunload'
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Xóa Event Listener khi component unmount
  window.removeEventListener("beforeunload", handleBeforeUnload);

  return (
    <div className="wrap-confirm">
      <div className="wrap-confirm-content">
        <h2>VUI LÒNG THANH TOÁN</h2>
        <div className="stopwatch-card">
          <p>{formatTime()}</p>
        </div>
        <div className="confirm">
          <tr>
            <td>Phương thức thanh toán</td>
            <td>
              <select className="select">
                <option value="0" className="item">
                  Chọn phương thức thanh toán
                </option>
                <option className="item">MoMo</option>
                {/* <option className="item">Zalo</option>
                <option className="item">Banking</option> */}
              </select>
            </td>
          </tr>
          <tr>
            <td>Tên khách hàng</td>
            <td>
              <input value={user.name} type="text" disabled="true"></input>
            </td>
          </tr>
          <tr>
            <td>Email của khách hàng</td>
            <td>
              <input value={user.email} type="text" disabled="true"></input>
            </td>
          </tr>
          <div className="submit">
            <button
              onClick={() => {
                setShowSeat(true);
                setShowBack(true);
                setConfirm(false);
              }}
              className="btn"
            >
              Quay lại
            </button>
            <button onClick={handleUpdateBill} className="btn">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;

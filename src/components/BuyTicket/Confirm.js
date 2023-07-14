import React, { useEffect, useRef, useState } from "react";
import "../../asset/css/Confirm.css";

function Confirm(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { setShowBack, showBack, setShowSeat, setConfirm } = props;
  const [timer, setTimer] = useState(900);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  
  const handleStart = () => {
    // start button logic here
    countRef.current = setInterval(() => {
      setTimer(timer => timer - 1);
      clearInterval(countRef.current)
    }, 1000);
    // clearInterval(countRef.current);
  };  

  

  const handleReset = () => {
    // Reset button logic here
    
    setIsActive(false);
    setIsPaused(false);
    setTimer(900);
  };
  useEffect(()=>{
    handleStart();
  }, [])

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
  };

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
                <option className="item">Zalo</option>
                <option className="item">Banking</option>
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
            <button className="btn">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;

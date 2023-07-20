import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../asset/css/Seat.css";
import { API } from "../API";

function Seat(props) {
  const [seat, setSeat] = useState([]);
  const param = useParams();

  const { values, amountTicket, amountChildrenTicket , listSeat, setListSeat } = props;

  useEffect(() => {
    const getSeat = async () => {
      const res = await fetch(
        `${API}room/getListSeat/calendar_id=${values.idChoiceDay}&schedule_id=${values.idChoiceSchedule}`
      );
      const getData = await res.json();
      setSeat(getData.data);
    };
    getSeat();
  }, [param.id]);
  const handleChoiceTicket = (item) => {
    setListSeat((prevListSeat) => {
      const isAlreadySelected = prevListSeat.includes(item.id);
      if (isAlreadySelected) {
        return prevListSeat.filter((seat) => seat !== item.id);
      } else if (prevListSeat.length === Number(amountTicket + amountChildrenTicket)) {
        const newListSeat = prevListSeat.slice(1);
        newListSeat.push(item.id);
        return newListSeat;
      } else {
        return [...prevListSeat, item.id];
      }
    });
  };
  const viewSeatSelected = (item) => {
    setListSeat((prevListSeat) => {
      const isAlreadySelected = prevListSeat.includes(item.name);
      if (item.status === false) {
        return prevListSeat.filter((seat) => seat !== item.name);
      } else if (prevListSeat.length === Number(amountTicket + amountChildrenTicket)) {
        const newListSeat = prevListSeat.slice(1);
        newListSeat.push(item.name);
        return newListSeat;
      } else {
        return [...prevListSeat, item.name];
      }
    });
  };

  return (
    <div className="wrap-seat">
      <div className="screen">
        <div>Screen</div>
      </div>
      <div className="seat">
        {seat?.map((item, index) => {
          if (item.status === false) {
            return (
              <div
                key={index}
                style={{ background: "red" }}
                className="seat-item"
              >
                <span>{item.name}</span>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{
                  background: listSeat?.find((seat) => seat === item.id)
                    ? "#04aa6d"
                    : "#d3d3d3",
                }}
                onClick={() => handleChoiceTicket(item)}
                className="seat-item"
              >
                <span>{item.name}</span>
              </div>
            );
          }
        })}
      </div>
      <hr></hr>
      <div className="description">
        <div className="des-seat">
          <div className="des-seat-status">
            <div className="seat-select"></div>
            <div className="des-seat-info">Ghế đang chọn</div>
          </div>
        </div>
        <div className="des-seat">
          <div className="des-seat-status">
            <div className="seat-sold"></div>
            <div className="des-seat-info">Ghế đã bán</div>
          </div>
        </div>
        <div className="des-seat">
          <div className="des-seat-status">
            <div className="seat-empty"></div>
            <div className="des-seat-info">Có thể chọn</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seat;

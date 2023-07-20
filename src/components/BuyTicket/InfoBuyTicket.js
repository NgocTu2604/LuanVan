import React, { useEffect, useState } from "react";
import "../../asset/css/InfoBuyTicket.css";
import { API } from "../../API";
function InfoBuyTicket(props) {
  const {
    setShowSeat,
    setShowBack,
    showBack,
    values,
    listSeat,
    setListSeat,
    setConfirm,
    confirm,
    total,
    amountTicket,
    amountChildrenTicket
  } = props;
  console.log(values);
  const [movie, setMovie] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/info/${values.choiceMovie}`);
      const getData = await res.json();
      console.log();
      setMovie(getData.data[0]);
      // console.log(getData.data);
    };
    getMovie();
  }, [values.choiceMovie]);

  const handleAddBill = async () => {
    const values = {
      user_id: userData.id,
      paymode: "",
      bill_status_id: 1,
      total_price: total,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch(`${API}bill/create`, requestOptions)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response.data.id);
        handleAddTicket(response.data.id);
      })
      .catch((error) => console.log(error));
  };
  // console.log(listSeat);
  const handleAddTicket = async (id) => {
    listSeat.map(async(item)=>{
      const value = {
        ticket_type_id: 1,
        movie_price_id: 1,
        seat_id: item,
        // room_id:1,
        schedule_id: Number(values.idChoiceSchedule),
        calendars_id: Number(values.idChoiceDay),
        bill_id: id,
      };
      console.log(listSeat);
  
      console.log(value);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      };
      await fetch(`${API}ticket/create`, requestOptions)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
          }
        })
        .catch((error) => console.log(error));
    })
    
  };

  return (
    <div className="wrap-ticket">
      <div className="ticket-movie-info">
        <div
          style={{
            backgroundImage: `url(${movie.poster})`,
            objectFit: "cover",
            width: "100%",
            height: "150px",
            backgroundSize: "cover",
          }}
        ></div>
        <div>{values.choiceTheater}</div>
        <div>
          Suất chiếu: {values.choiceSchedule} | {values.choiceDay}
        </div>
        <div>
          Ghế:
          {listSeat.map((item, index) => (
            <>
              {index - 1 === listSeat.length ? (
                <span key={index}>{item}</span>
              ) : (
                <span> {item} </span>
              )}
            </>
          ))}
        </div>
        <div>Tổng tiền: {total}</div>
        {!confirm && (
          <div className="ticket-button">
            {showBack && (
              <button
                onClick={() => {
                  setShowSeat(false);
                  setShowBack(false);
                  setListSeat([]);
                }}
                className="btn"
              >
                QUAY LẠI
              </button>
            )}
            {listSeat.length > 0 ? (
              <button
                onClick={() => {
                  setShowSeat(false);
                  setConfirm(true);
                  handleAddBill();
                }}
                className="btn"
              >
                TIẾP TỤC--
              </button>
            ) : (
              <button
                onClick={() => {
                  if (amountTicket !== 0 && amountChildrenTicket !=0) {
                    setShowSeat(true);
                    setShowBack(true);
                  }
                }}
                className="btn"
              >
                TIẾP TỤC
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoBuyTicket;

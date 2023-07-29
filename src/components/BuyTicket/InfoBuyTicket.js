import React, { useEffect, useState } from "react";
import "../../asset/css/InfoBuyTicket.css";
import { API } from "../../API";
function InfoBuyTicket(props) {
  const {
    setShowSeat,
    setShowBack,
    showBack,
    // values,
    listSeat,
    setListSeat,
    setConfirm,
    confirm,
    total,
    listNameSeat,
    setResBuyTicket,
  } = props;
  let { amountTicket, amountChildrenTicket } = props;
  const values = JSON.parse(localStorage.getItem("bookTickettTemp"));
  // console.log(values);
  const [movie, setMovie] = useState([]);
  const [seatName, setSeatName] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/info/${values.choiceMovie}`);
      const getData = await res.json();
      setMovie(getData.data[0]);
    };
    getMovie();
  }, [values.choiceMovie]);

  const getSeatName = async (id) => {
    console.log(id);
    const res = await fetch(`${API}room/getseatname/seat_id=${id}`);
    const getData = await res.json();
    console.log(getData);
    return getData.data[0];
    setSeatName(getData.data[0]);
  };

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
        setResBuyTicket(response);
        handleAddTicket(response.data.id);
      })
      .catch((error) => console.log(error));
  };
  const handleAddTicket = async (id) => {
    listSeat.map(async (item, index) => {
      let valueTicket;
      if (amountTicket > 0) {
        valueTicket = {
          ticket_type_id: 2,
          seat_id: item,
          schedule_id: Number(values.idChoiceSchedule),
          calendars_id: Number(values.idChoiceDay),
          bill_id: id,
        };
        amountTicket--;
      } else if (amountChildrenTicket > 0) {
        valueTicket = {
          ticket_type_id: 1,
          seat_id: item,
          schedule_id: Number(values.idChoiceSchedule),
          calendars_id: Number(values.idChoiceDay),
          bill_id: id,
        };
      }

      // console.log(listSeat);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueTicket),
      };
      await fetch(`${API}ticket/create`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
          }
        })
        .catch((error) => console.log(error));
    });
  };
  console.log(listNameSeat);

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
          {listNameSeat.map((item, index) => (
            <span> {item} </span>
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
                  if (amountTicket !== 0 || amountChildrenTicket !== 0) {
                    setShowSeat(true);
                    setShowBack(true);
                  }
                }}
                className="btn"
              >
                TIẾP TỤC-
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoBuyTicket;

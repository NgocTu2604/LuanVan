import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../asset/css/BuyTicket.css";
import { API } from "../../API";

function BuyTicket(props) {
  const { setValues, movieChoiseinfo } = props;
  //CHỌN PHIM

  const [currentMovie, setCurrentMovie] = useState([]);
  const [choiceMovie, setChoiceMovie] = useState(
    movieChoiseinfo !== -1 ? movieChoiseinfo : null
  );
  const navigate = useNavigate();
  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/getbystatus/1`);
      const getData = await res.json();
      setCurrentMovie(getData.data);
    };
    getMovie();
  }, []);

  const handChangeMovie = (e) => {
    setChoiceMovie(e.target.value);
    getTheater(e.target.value);
  };

  //CHỌN RẠP
  const [theater, setTheater] = useState([]);
  const [choiceTheater, setChoiceTheater] = useState([]);

  const getTheater = async (choiceMovie) => {
    const res = await fetch(`${API}calendar/gettheaterbymovie/${choiceMovie}`);
    const getData = await res.json();
    setTheater(getData.data);
  };

  const handChangeTheater = (e) => {
    setChoiceTheater(e.target.value);
    console.log(e.target.value);
    getDay(e.target.value);
    // localStorage.removeItem("theater");
  };

  //CHỌN NGÀY
  const [day, setDay] = useState([]);
  const [choiceDay, setChoiceDay] = useState([]);

  const getDay = async (choiceTheater) => {
    console.log(choiceMovie);
    console.log(movieChoiseinfo);
    const res = await fetch(
      `${API}calendar/getcalendar/movie_id=${choiceMovie}&theater_id=${choiceTheater}`
    );
    const getData = await res.json();
    setDay(getData.data);
  };
  console.log(day);
  const handChangeDay = (e) => {
    setChoiceDay(e.target.value);
    getSchedule(e.target.value);
  };

  //CHỌN SUẤT

  const [schedule, setSchedule] = useState([]);
  const [choiceSchedule, setChoiceSchedule] = useState([]);

  const getSchedule = async (choiceDay) => {
    const res = await fetch(
      `${API}calendar/gettime/theater_id=${choiceTheater}&calendar_id=${choiceDay}`
    );
    const getData = await res.json();
    setSchedule(getData.data);
  };

  const handChangeSchedule = (e) => {
    setChoiceSchedule(e.target.value);
  };

  //Xác nhận mua vé

  const handleSubmit = (event) => {
    event.preventDefault();
    const dayFull = day.filter((item) => item.id === choiceDay)[0].date;
    const scheduleFull = schedule.filter(
      (item) => item.id === choiceSchedule
    )[0].time_start;
    const theaterFull = theater.filter((item) => item.id === choiceTheater)[0]
      .theater_name;

    const newValues = {
      choiceMovie: choiceMovie,
      choiceTheater: theaterFull,
      choiceDay: dayFull,
      choiceSchedule: scheduleFull,
      idChoiceTheather: choiceTheater,
      idChoiceSchedule: choiceSchedule,
      idChoiceDay: choiceDay,
    };

    setValues(newValues);
    navigate("/ticket");
  };
  const theaterLocal = JSON.parse(localStorage.getItem("theater"));
  console.log(theater);
  console.log(theater.length !== 0);

  return (
    <div
      className="wrap-buy "
      style={{ position: "absolute", top: "100px", right: "0px" }}
    >
      <div className="buy">ĐẶT VÉ</div>
      <div className="buy-ticket">
        <div className="buy-ticket-item">
          {movieChoiseinfo ? (
            <select className="item" onChange={handChangeMovie}>
              <option value={movieChoiseinfo}>
                {
                  currentMovie?.find((item) => item.id === movieChoiseinfo)
                    ?.title
                }
              </option>
              {currentMovie.map((movie, index) => {
                if (movie.id === movieChoiseinfo) {
                  return;
                }
                return (
                  <option value={movie.id} key={index}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
          ) : (
            <select className="item" onChange={handChangeMovie}>
              <option value="0">Chọn phim</option>
              {currentMovie.map((movie, index) => {
                return (
                  <option value={movie.id} key={index}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="buy-ticket-item">
          <select className="item" onChange={handChangeTheater}>
            <option value="0">Chọn rạp</option>
            {theater.length !== 0 ? (
              <>
                {theater?.map((theater, index) => {
                  return (
                    <option value={theater.id} key={index}>
                      {theater.theater_name}
                    </option>
                  );
                })}
              </>
            ) : (
              <>
                {theaterLocal?.map((theater, index) => {
                  console.log(theater);
                  return (
                    <option value={theater.id} key={index}>
                      {theater.theater_name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div className="buy-ticket-item">
          <select className="item" onChange={handChangeDay}>
            <option value="0">Chọn ngày</option>
            {day === null ? (
              <option></option>
            ) : (
              <>
                {day.map((day, index) => {
                  return (
                    <option value={day.id} key={index}>
                      {day.date}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div className="buy-ticket-item">
          <select className="item" onChange={handChangeSchedule}>
            <option value="0">Chọn suất</option>
            {day === null ? (
              <option></option>
            ) : (
              <>
                {schedule.map((schedule, index) => {
                  return (
                    <option value={schedule.id} key={index}>
                      {schedule.time_start}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
      </div>
      <div className="submit">
        <button onClick={handleSubmit} className="btn-buy">
          Mua
        </button>
      </div>
    </div>
  );
}
export default BuyTicket;

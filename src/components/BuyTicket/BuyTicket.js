import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../asset/css/BuyTicket.css";
import { API } from "../../API";
import MyContext from "../Store/Context";

function BuyTicket(props) {
  const { viewLogin, setViewLogin } = useContext(MyContext);
  const { setValues, movieChoiseinfo } = props;
  const userData = JSON.parse(localStorage.getItem("user"));
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
    console.log(e.target.value);
    setChoiceMovie(e.target.value);
    getDay(e.target.value);
  };

  //CHỌN RẠP
  //   const [theater, setTheater] = useState([]);
  //   const [choiceTheater, setChoiceTheater] = useState([]);

  //   const getTheater = async (choiceMovie) => {
  //     const res = await fetch(`${API}calendar/gettheaterbymovie/${choiceMovie}`);
  //     const getData = await res.json();
  //     getDay();
  //   };

  //   const handChangeTheater = (e) => {
  //     setChoiceTheater(e.target.value);
  //     getDay(e.target.value);
  //   };

  useEffect(() => {
    // console.log(movieChoiseinfo);
    if (movieChoiseinfo !== -1) {
      // console.log(123);
      getDay(movieChoiseinfo);
    }
  }, [movieChoiseinfo]);

  //CHỌN NGÀY
  const [day, setDay] = useState([]);
  const [choiceDay, setChoiceDay] = useState(null);

  const getDay = async (idMovieChoise) => {
    const res = await fetch(
      `${API}calendar/getcalendar/movie_id=${idMovieChoise}&theater_id=1`
    );
    const getData = await res.json();
    // console.log(getData.data);
    setDay(getData.data);
  };
  const handChangeDay = (e) => {
    setChoiceDay(e.target.value);
    getSchedule(e.target.value);
  };

  //CHỌN SUẤT

  const [schedule, setSchedule] = useState([]);
  const [choiceSchedule, setChoiceSchedule] = useState(null);

  const getSchedule = async (choiceDay) => {
    const res = await fetch(
      `${API}calendar/gettime/theater_id=1&calendar_id=${choiceDay}`
    );
    const getData = await res.json();
    setSchedule(getData.data);
  };

  const handChangeSchedule = (e) => {
    setChoiceSchedule(e.target.value);
  };

  //Xác nhận mua vé

  const handleSubmit = (event) => {
    // console.log(choiceMovie === null);
    // console.log(choiceDay === null);
    // console.log(choiceSchedule === null);
    if (!userData) {
      alert("Vui long dang nhap de tiep tuc");
      setViewLogin(true);
    } else if (
      (choiceMovie === null && movieChoiseinfo === -1) ||
      choiceDay === null ||
      choiceSchedule === null
    ) {
      alert("Vui lòng chọn đầy đủ thông tin mua vé");
      return;
    } else {
      event.preventDefault();
      const dayFull = day?.filter((item) => item.id === choiceDay)[0].date;
      const scheduleFull = schedule?.filter(
        (item) => item.id === choiceSchedule
      )[0].time_start;
      // const theaterFull = theater.filter((item) => item.id === choiceTheater)[0].theater_name;

      let movie;
      if (movieChoiseinfo && movieChoiseinfo !== -1) {
        movie = movieChoiseinfo;
      } else {
        movie = choiceMovie;
      }

      const newValues = {
        choiceMovie: movie,
        choiceTheater: "",
        choiceDay: dayFull,
        choiceSchedule: scheduleFull,
        idChoiceTheather: 1,
        idChoiceSchedule: choiceSchedule,
        idChoiceDay: choiceDay,
      };
      localStorage.setItem("bookTickettTemp", JSON.stringify(newValues));

      setValues(newValues);
      console.log(newValues);
      navigate("/ticket");
    }
  };

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
                  return false;
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
          Muaâ
        </button>
      </div>
    </div>
  );
}
export default BuyTicket;

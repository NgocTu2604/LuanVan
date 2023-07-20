import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Header from "../../Pages/Header";
import Navbar from "../../Pages/Navbar";
import FooterPage from "../../Pages/FooterPage";
import FooterBottom from "../../Pages/FooterBottom";
import "../../asset/css/InfoMovie.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyTicket from "./BuyTicket";
import { API } from "../../API";
import HoverRating from "../Movies/HoverRating";
import AppModal from "./AppModal";
import ModalContent from "./ModalContent";
import moment from "moment/moment";

function InfoMovie(props) {
  const [info, setInfo] = useState([]);
  const [infoActor, setInfoActor] = useState([]);
  const [genre, setGenre] = useState([]);
  // const movieID
  const param = useParams();
  // console.log(param.id);
  const { setValues } = props;
  const [movieChoiseinfo, setMovieChoiseinfo] = useState(-1);
  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(`${API}movie/info/${param.id}`);
      const getData = await res.json();
      setInfo(getData.data[0]);
      setMovieChoiseinfo(param.id);
      
    };
    getInfo();
  }, [param.id]);

  useEffect(() => {
    const getInfoActor = async () => {
      const res = await fetch(`${API}movie/getactorbymovie/${param.id}`);
      const getData = await res.json();
      setInfoActor(getData.data);
      // console.log(getData.data);
    };
    getInfoActor();
  }, [param.id]);

  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(`${API}movie/getgenrebymovie/${param.id}`);
      const getData = await res.json();
      setGenre(getData.data);
      // console.log(getData.data);
    };
    getGenre();
  }, [param.id]);

  return (
    <div>
      <BuyTicket movieChoiseinfo={movieChoiseinfo} setValues={setValues} />
      <div className="info-content">
        <div className="info-content-wrap">
          <img className="image" src={info?.poster} alt=""></img>
          <div className="middle">
            <div className="play">
              <AppModal url={info?.trailer}>
                
                <i className="fa-solid fa-circle-play"></i>
              </AppModal>
            </div>
          </div>
        </div>

        <div className="info-content-item">
          <h2>{info?.title}</h2>

          <h2>{info?.slug}</h2>
          <h2>Thời lượng: {info?.duration} Phút</h2>
          <h2>Phân loại dành cho người: {info?.age_limit} tuổi trở lên</h2>
          <div>Đạo diễn: {info?.name} </div>
          <div>Quốc gia: {info?.country_name}</div>
          <div>
            Diễn viên:
            <>
              {infoActor?.map((item, index) => (
                <span key={index}>
                  {item.full_name}
                  {infoActor?.length - 1 === index ? "" : ", "}
                </span>
              ))}
            </>
          </div>
          <div>
            Thể loại:{" "}
            <>
              {genre?.map((item, index) => (
                <span key={index}>
                  {item.genre_name}
                  {genre?.length - 1 === index ? "" : ", "}
                </span>
              ))}
            </>
          </div>
          <div>Ngày khởi chiếu: {info?.release_date}</div>
          <div></div>
          <div>
            Đánh giá: <HoverRating />
          </div>
          <div>Tổng sao:</div>
        </div>
      </div>
      <div className="info-content-movie">
        <h2>NỘI DUNG PHIM</h2>
        <div>{info?.movie_des}</div>
      </div>
    </div>
  );
}
export default InfoMovie;

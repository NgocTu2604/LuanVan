import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Header from "../../Pages/Header";
import Navbar from "../../Pages/Navbar";
import FooterPage from "../../Pages/FooterPage";
import FooterBottom from "../../Pages/FooterBottom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../asset/css/ShowActor.css";
import { API } from "../../API";

function ShowActor(props) {
  const [actor, setActor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getActor = async () => {
      const res = await fetch(`${API}actor/getall`);
      const getData = await res.json();
      setActor(getData);
      // console.log(getData);
    };
    getActor();
  }, []);
  return (
    <div>
      <div className="actor-info-wrap">
        <div>
          <h3>DIỄN VIÊN</h3>
        </div>

        <div className="wrap-actor">
          {actor.data === undefined ? (
            <></>
          ) : (
            actor.data.map((item, index) => {
              return (
                <div className="actor-info-item">
                  <div className="actor-info-content">
                    <div>
                      <img className="img" src={item.image} alt=""></img>
                    </div>
                    <div className="actor-info">
                      <h5>Tên: {item.full_name} </h5>
                      <p>Ngày sinh: {item.birthday}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
export default ShowActor;

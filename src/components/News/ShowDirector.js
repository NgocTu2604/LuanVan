import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Header from "../../Pages/Header";
import Navbar from "../../Pages/Navbar";
import FooterPage from "../../Pages/FooterPage";
import FooterBottom from "../../Pages/FooterBottom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../asset/css/ShowDirector.css";
import { API } from "../../API";

function ShowDirector(props) {
  const [director, setDirector] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDirector = async () => {
      const res = await fetch(`${API}director/getall`);
      const getData = await res.json();
      setDirector(getData);
      // console.log(getData);
    };
    getDirector();
  }, []);
  return (
    <div>
      <div className="director-info-wrap">
        <div>
          <h3>ĐẠO DIỄN</h3>
        </div>
        <div className="wrap-director">
          {director.data === undefined ? (
            <></>
          ) : (
            director.data.map((item, index) => {
              return (
                <div className="director-info-item">
                  <div className="director-info-content">
                    <div>
                      <img className="img" src={item.image} alt="" />
                    </div>
                    <div className="director-info">
                      <h5>{item.full_name}</h5>
                      <p style={{ width: "50%" }}>{item.story}</p>
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
export default ShowDirector;

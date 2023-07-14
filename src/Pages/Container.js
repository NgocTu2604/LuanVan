import { Box, Tab, Tabs } from "@mui/material";
import "../asset/css/main.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../API";

function Container(props) {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [theater, setTheater] = useState([]);
  const [value, setValue] = useState("one");
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/getbystatus/1`);
      const getData = await res.json();
      setCurrentMovie(getData);
      // console.log(getData);
    };
    getMovie();
  }, []);

  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/getbystatus/2`);
      const getData = await res.json();
      setUpcomingMovie(getData);
      // console.log(getData);
    };
    getMovie();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getTheater = async (choiceMovie) => {
    const res = await fetch(`${API}calendar/gettheaterbymovie/${choiceMovie}`);
    const getData = await res.json();
    localStorage.setItem("theater", JSON.stringify(getData.data));

  };  

  const handleViewDetail = (item) => {
    getTheater(item.id);
    navigate(`/InfoMovie/${item.id}`);
  };
  return (
    <div className="content">
      <Box sx={{ width: "100%", margin: "50px 0 0 0" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="PHIM ĐANG CHIẾU" />
          <Tab value="two" label="PHIM SẮP CHIẾU" />
        </Tabs>
      </Box>
      {value === "one" ? (
        <div className="wrap-content">
          {currentMovie.data === undefined ? (
            <></>
          ) : (
            currentMovie.data.map((item, index) => {
              if (index < 6) {
                return (
                  <div key={index} className="content-item">
                    <div className="content-item-wrap">
                      <img className="image" alt="" src={item.poster} />
                      <div className="middle">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="text"
                        >
                          XEM
                        </button>
                      </div>
                    </div>
                    <h4 className="img-title">{item.title}</h4>
                  </div>
                );
              }
            })
          )}
        </div>
      ) : value === "two" ? (
        <div className="wrap-content">
          {upcomingMovie.data === undefined ? (
            <></>
          ) : (
            upcomingMovie.data.map((item, index) => {
              if (index < 6) {
                return (
                  <div key={index} className="content-item">
                    <div className="content-item-wrap">
                      <img className="image" alt="" src={item.poster} />
                      <div className="middle">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="text"
                        >
                          XEM
                        </button>
                      </div>
                    </div>
                    <h4 className="img-title">{item.title}</h4>
                  </div>
                );
              }
            })
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Container;

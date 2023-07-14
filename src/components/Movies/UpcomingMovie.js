import { Box, Tab, Tabs } from "@mui/material";
import "../../asset/css/main.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../API";

function UpcomingMovie(props) {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [value, setValue] = useState("one");
  const navigate = useNavigate();

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

  const handleViewDetail = (item) => {
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
         <Tab
            value="one"
            label="PHIM SẮP CHIẾU"
            style={{
              color: "black",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          />
        </Tabs>
      </Box>
      {value === "one" ? (
        <div className="wrap-content">
          {upcomingMovie.data === undefined ? (
            <></>
          ) : (
            upcomingMovie.data.map((item, index) => {
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
            })
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UpcomingMovie;

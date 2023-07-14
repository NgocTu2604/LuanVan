import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../API";
import { Box, Tab, Tabs } from "@mui/material";

function CurrentMovie() {
  const [currentMovie, setCurrentMovie] = useState([]);
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
            label="PHIM ĐANG CHIẾU"
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
          {currentMovie.data === undefined ? (
            <></>
          ) : (
            currentMovie.data.map((item, index) => {
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

export default CurrentMovie;

import React, { useState } from "react";
import "../asset/css/SearchBar.css";
import { API } from "../API";
export const SearchBar = ({ setResults, setResultEnter }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`https://mycinema1.click/api/movie/getall`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.filter((movie) => {
          return (
            value &&
            movie &&
            movie.title &&
            movie.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" && input !== "") {
      setResultEnter(true);
    }
  };
  return (
    <div className="input-wrapper">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        placeholder="Tìm kiếm phim"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

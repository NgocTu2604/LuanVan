import React from "react";
import "../asset/css/SearchResults.css";
import { Link } from "react-router-dom";

export const SearchResults = ({results}) => {
  console.log(results);
  return <Link style={{textDecoration: "none", fontSize: "large"}} to={`/InfoMovie/${results.id}`} > <div  className="search-results">{results.title}</div></Link>;
};

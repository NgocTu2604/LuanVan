import React from "react";
import "../asset/css/SearchResultsList.css";
import { SearchResults } from "./SearchResults";

export const SearchResultsList = ({ results, resultEnter }) => {
  // console.log(resultEnter);
  return (
    <div className="results-list">
      {resultEnter && results.length === 0 && alert("Ko có kq")}
      {results.map((results, index) => {
        return <SearchResults results={results} key={index} />;
      })}
    </div>
  );
};

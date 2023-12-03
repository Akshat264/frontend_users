import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/nav.css";
function Navigation({ handlesearch }) {
  const [search, setSearch] = useState("");
  return (
    <div className="navbar">
      <div className="title">
        <h2>Make Your Team</h2>
      </div>
      <div className="search-box">
        <div className="teams_link">
          <a href="/teams">My Teams</a>
        </div>
        <input
          type="text"
          placeholder="Search User..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="search-button"
          onClick={() => handlesearch(search)}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default Navigation;

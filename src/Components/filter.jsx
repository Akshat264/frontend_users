import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";

import "../styles/filters.css";
function Filters({
  handleFilters,
  domain,
  gender,
  available,
  setDomain,
  setGender,
  setAvailable,
  setTeamName,
  temp,
  setTemp,
  handleTeamCreation,
}) {
  return (
    <div>
      <div className="filters">
        <div>
          <input
            type="text"
            placeholder="Domain"
            className="filter_input"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Gender"
            className="filter_input"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Availability: true/false"
            className="filter_input"
            onChange={(e) => {
              setAvailable(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="apply_filter_btn"
            onClick={() => handleFilters(domain, gender, available)}
          >
            Apply Filter
          </button>
          <button
            className="create_team_btn"
            onClick={() => {
              setTemp(!temp);
            }}
          >
            Create Team
          </button>
        </div>
      </div>
      {temp && (
        <div className="input_team_name">
          <span>
            <label>Enter your team name:</label>
          </span>
          <span>
            <input
              type="text"
              placeholder="Team name"
              className="team_name"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            />
          </span>
          <label className="label">Select Users by clicking on the cards</label>
          <button
            className="create_btn"
            onClick={() => {
              handleTeamCreation();
            }}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}
export default Filters;

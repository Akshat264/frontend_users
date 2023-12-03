import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../styles/teams.css";
function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`http://${process.env.REACT_APP_URL}/api/team`)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(teams);
  return (
    <div className="Teams">
      <div className="navbar">
        <div className="title">
          <h2>List of My Teams</h2>
        </div>
        <div className="search-box">
          <a href="/" className="backtohome">
            Back
          </a>
        </div>
      </div>
      <div className="teams">
        {teams.map((item) => (
          <div className="team_card">
            <div className="team-name">{item.name}</div>
            <div className="members_team">
              {item.members.map((user) => (
                <div className="member_team">
                  <img className="avatar_team" src={user.avatar} alt="Avatar" />
                  <div className="member-info_team">
                    <div className="member-name_team">
                      {user.first_name + " " + user.last_name}
                    </div>
                    <div className="member-email_team">{user.email}</div>
                    <div className="member-domain_team">{user.domain}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Teams;

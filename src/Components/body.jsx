import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Filters from "./filter";
import "../styles/body.css";
function Body({ searcheddata, setSearch }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`http://${process.env.REACT_APP_URL}/api/users`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const changePage = async (page) => {
    setCurrentPage_filter(1);
    setCurrentPage(page);
    await axios
      .get(`http://${process.env.REACT_APP_URL}/api/users?page=${page}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error changing page", error);
      });
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      changePage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== 50) {
      changePage(currentPage + 1);
    }
  };
  // Filters + pagination
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState("");
  const handleFilters = async (domain, gender, available) => {
    setCurrentPage_filter(1);
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_URL}/api/users?domain=${domain}&gender=${gender}&available=${available}`
      );
      setSearch(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  const [currentPage_filter, setCurrentPage_filter] = useState(1);
  const changePage_filter = async (
    currentPage_filter,
    domain,
    gender,
    available
  ) => {
    console.log("Akshat");
    setCurrentPage_filter(currentPage_filter);
    await axios
      .get(
        `http://${process.env.REACT_APP_URL}/api/users?domain=${domain}&gender=${gender}&available=${available}&page=${currentPage_filter}`
      )
      .then((response) => {
        setSearch(response.data);
      })
      .catch((error) => {
        console.error("Error changing page", error);
      });
  };
  const prevPage_filter = () => {
    console.log(currentPage_filter);
    if (currentPage_filter !== 1)
      changePage_filter(currentPage_filter - 1, domain, gender, available);
  };
  const nextPage_filter = () => {
    console.log(currentPage_filter);
    console.log(searcheddata);
    if (searcheddata.length === 20)
      changePage_filter(currentPage_filter + 1, domain, gender, available);
  };
  // Code for team Creation
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [temp, setTemp] = useState(false);
  const [showPopup, setShowpopup] = useState(false);
  const [addedMember, setAddedmember] = useState("");
  const handleUserSelection = (user) => {
    // Check if the user's domain is unique and availability is true
    if (temp === true) {
      const isDomainUnique = !selectedUsers.some(
        (selectedUser) => selectedUser.domain === user.domain
      );
      const isAvailabilityTrue = user.available === true;

      if (isDomainUnique && isAvailabilityTrue) {
        setSelectedUsers([...selectedUsers, user.email]);
        setAddedmember(user.first_name);
        setShowpopup(true);
        setTimeout(() => {
          setShowpopup(false);
          setAddedmember("");
        }, 1500);
      } else {
        console.log(
          "User not added. Domain is not unique or availability is not true."
        );
      }
    }
  };
  console.log(selectedUsers);
  const handleTeamCreation = () => {
    // Send a request to create the team using the selectedUsers and teamName
    // Replace the placeholder URL with your actual API endpoint
    fetch(`http://${process.env.REACT_APP_URL}/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teamName, memberEmails: selectedUsers }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Team Created Successfully with name: ${teamName}`);
      })
      .catch((error) => console.error("Error creating team:", error));
  };
  return (
    <div>
      <Filters
        handleFilters={handleFilters}
        domain={domain}
        gender={gender}
        available={available}
        setDomain={setDomain}
        setGender={setGender}
        setAvailable={setAvailable}
        setTeamName={setTeamName}
        temp={temp}
        setTemp={setTemp}
        handleTeamCreation={handleTeamCreation}
      />
      <div className="display_cards">
        {searcheddata.length === 0
          ? data.map((item) => (
              <div
                className={`card ${temp ? "pointer" : ""}`}
                onClick={() => {
                  handleUserSelection(item);
                }}
              >
                <div className="avatar">
                  <div className="avatarimage">
                    <img src={item.avatar} alt="avatar" />
                  </div>
                  <h2>{item.first_name + " " + item.last_name}</h2>
                </div>
                <div className="info">
                  <div className="temp1">
                    <p>
                      <b>Email-id:</b>&nbsp;{item.email}
                    </p>
                    <p>
                      <b>Domain:</b>&nbsp;{item.domain}
                    </p>
                    <p>
                      <b>Gender:</b> <span className="male">{item.gender}</span>
                    </p>
                    <p>
                      {item.available === true ? (
                        <span className="true">Available</span>
                      ) : (
                        <span className="false">Not Available</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : searcheddata.map((item) => (
              <div
                className={`card ${temp ? "pointer" : ""}`}
                onClick={() => {
                  handleUserSelection(item);
                }}
              >
                <div className="avatar">
                  <div className="avatarimage">
                    <img src={item.avatar} alt="avatar" />
                  </div>
                  <h2>{item.first_name + " " + item.last_name}</h2>
                </div>
                <div className="info">
                  <div className="temp1">
                    <p>
                      <b>Email-id:</b>&nbsp;{item.email}
                    </p>
                    <p>
                      <b>Domain:</b>&nbsp;{item.domain}
                    </p>
                    <p>
                      <b>Gender:</b> <span className="male">{item.gender}</span>
                    </p>
                    <p className="availability">
                      {item.available === true ? (
                        <span className="true">Available</span>
                      ) : (
                        <span className="false">Not Available</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        {showPopup && (
          <div className="popup">
            <p>{addedMember} added to the team!</p>
          </div>
        )}
      </div>
      {searcheddata.length === 0 ? (
        <div className="pagination_icons">
          <ul className="pagination">
            <li className="prev" onClick={() => prevPage()}>
              &#9665; Prev
            </li>
            <input
              type="text"
              className="pageno"
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(e.target.value);
                changePage(currentPage);
              }}
            />
            <li className="next" onClick={() => nextPage()}>
              Next &#9655;
            </li>
          </ul>
        </div>
      ) : (
        <div className="pagination_icons">
          <ul className="pagination">
            <li className="prev" onClick={() => prevPage_filter()}>
              &#9665; Prev
            </li>
            <input
              type="text"
              className="pageno"
              value={currentPage_filter}
              onChange={(e) => {
                setCurrentPage_filter(e.target.value);
                changePage_filter(
                  currentPage_filter,
                  domain,
                  gender,
                  available
                );
              }}
            />
            <li className="next" onClick={() => nextPage_filter()}>
              Next &#9655;
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Body;

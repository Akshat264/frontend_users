import React, { useState } from "react";
import { ReactDOM } from "react";
import Body from "./Components/body";
import Navigation from "./Components/nav";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const handleSearch = async (query) => {
    if (query !== "") {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_URL}/api/users?search=${query}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error searching data:", error);
      }
    }
  };
  return (
    <div className="App">
      <Navigation handlesearch={handleSearch} />
      <Body searcheddata={data} setSearch={setData} />
    </div>
  );
}

export default App;

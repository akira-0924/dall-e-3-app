import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const geneteteImage = async () => {
  console.log("called");
  axios
    .post("http://localhost:5001/generateImage")
    .then((res) => {
      console.log("called2");
      console.log(res);
    })
    .catch((err) => {
      console.log("called3");
      console.log(err);
    });
};

function App() {
  const handleSubmit = () => {
    console.log("called");
    geneteteImage();
  };

  useEffect(() => {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://13.115.248.31/generateImage",
          headers
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>text parser</h1>
        <form onSubmit={handleSubmit}>
          {/* <label>
            <input
              style={{ color: "#111111" }}
              type="text"
              name="text"
              value={val}
              onChange={handleChange}
            />
          </label> */}
          <br />
          <input type="submit" value="Parse" />
        </form>
      </header>
    </div>
  );
}

export default App;

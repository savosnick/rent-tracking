import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function App() {
  const [games, setGames] = useState({ test: "test" });
  // console.log(games)
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    params: { category: "shooter" },
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "hidden",
    },
  };

  const getData = async () => {
    const resp = await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setGames(response.data);
        //  console.log(games)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => getData(), []);

  const getInfo = (games) => {
    let gameInfo = [];
    for (let i = 0; i < games.length; i++) {
      gameInfo.push(
        games[i].title +
          " || Released: " +
          games[i].release_date +
          " || " +
          games[i].short_description
      );
    }
    return gameInfo;
  };

  const gameInfo = getInfo(games);

  return (
    <div className="App">
      <header title="List of 100 shooter games" className="App-header">
        List of 100 Shooter Games
        <Container className="justify-content-center">
          {games?.length
            ? gameInfo.map((gameInfo, i) => <p key={i}>{gameInfo}</p>)
            : "You are downloading a lot of data. Please wait! Patience my friend"}
        </Container>
      </header>
    </div>
  );
}

export default App;

import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { possibleOuts } from "../constants/index.js";
import WinPage from "./WinPage.jsx";
import PlayerGameDetails from "./PlayerGameDetails.jsx";
import PinPad from "./PinPad.jsx";

const Game = () => {
 
  
  let possibleOutKeys = Object.keys(possibleOuts).map((e) => parseInt(e));

  const [startingPlayerIndex, setStartingPlayerIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [winSection, setWinSection] = useState(false);

  const location = useLocation();
  const { leg, set, points, currentPlayers } = location.state || {
    leg: 0,
    set: 0,
    points: 0,
    currentPlayers: [],
  };

  const [players, setPlayers] = useState(
    currentPlayers.map((player) => ({
      ...player,
      legs: leg,
      legWins: 0,
      setWins: 0,
      sets: set,
      points: points,
      out: "",
      dartsCount: 0,
      pointsScoredInGame: 0,
      rounds: 0,
      average: 0,
    }))
  );

  async function updateWins(player) {
    const updatedPlayer = {
      ...player,
      wins: player.wins + 1,
    };
    const response = await fetch(`/api/players/${player.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPlayer),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function isLegEnd(currentPlayer) {
    if (currentPlayer.points == 0) {
      currentPlayer.legWins++;
      return true;
    } else {
      console.log("not yet");
      return false;
    }
  }

  function getTheScore_sPossibleOutsArray(score) {
    if (possibleOutKeys.includes(score)) {
      let outPairs = possibleOuts[score];
      if (outPairs && outPairs.length > 0) {
        let outPairsFirstElement = outPairs[0];
        return outPairsFirstElement;
      }
    }
  }

  function checkForWin(currentPlayer, playersCopy) {
    if (currentPlayer.legs == 0) {
      currentPlayer.sets--;
      if (currentPlayer.sets == 0) {
        updateWins(currentPlayer);
        setWinSection(true);
        console.log("you won");
      } else {
        let playersWithResetedPoints = playersCopy.map((player) => {
          return { ...player, points: 501, legs: leg };
        });
        setStartingPlayerIndex(startingPlayerIndex + 1);
        setPlayers(playersWithResetedPoints);
        setCurrentPlayerIndex(
          (startingPlayerIndex + 1) % currentPlayers.length
        );
      }
    } else {
      let playersWithResetedPoints = playersCopy.map((player) => {
        return { ...player, points: points };
      });
      setStartingPlayerIndex(startingPlayerIndex + 1);
      console.log(startingPlayerIndex);
      setPlayers(playersWithResetedPoints);
      setCurrentPlayerIndex((startingPlayerIndex + 1) % currentPlayers.length);
    }
  }

  function handleSubmitScore() {
    let playersCopy = [...players];
    let currentPlayer = playersCopy[currentPlayerIndex];
    let numberToSubtract = parseInt(inputValue, 10);

    if (!isNaN(numberToSubtract) && numberToSubtract < 180) {
      currentPlayer.pointsScoredInGame += numberToSubtract;
      currentPlayer.rounds++;
      currentPlayer.average =
        currentPlayer.pointsScoredInGame / currentPlayer.rounds;
      currentPlayer.dartsCount += 3;
      currentPlayer.points -= numberToSubtract;
      let outPair = getTheScore_sPossibleOutsArray(currentPlayer.points);
      currentPlayer.out = outPair;
      if (isLegEnd(currentPlayer)) {
        console.log("end of leg");
        currentPlayer.legs--;
        checkForWin(currentPlayer, playersCopy);
      } else {
        setPlayers(playersCopy);
        setCurrentPlayerIndex(
          (prevIndex) => (prevIndex + 1) % currentPlayers.length
        );


      }
      setInputValue("");
    } else {
      alert("Invalid score");
      setInputValue("");
    }
  }

  return winSection ? (
    <WinPage players={players} currentPlayerIndex={currentPlayerIndex} />
  ) : (
    <main className="flex flex-col justify-center items-center mt-5">
      <section id="game" className="flex flex-col items-center game-section">
        <div className="flex flex-row justify-center gap-10 text-white mb-3 text-xs sm:text-lg">
          <p>{points}, Double Out, First to:</p>
          <p>Legs: {leg}</p>
          <p>Sets: {set}</p>
        </div>

        <div
          className={`flex flex-col w-full md:w-2/3 h-32 mb-3 justify-start items-center gap-2 border-2 border-black p-1 text-white`}
        >
          <div className="flex flex-row gap-8 w-full">

            <div className="text-xs flex w-1/2">
              <div className="flex gap-2 px-2 justify-between">
                <div className="flex flex-col space-y-0.5">
                  <h1>Average:</h1>
                  <h1>Leg:</h1>
                  <h1>Set:</h1>
                  <h1>🎯:</h1>
                </div>
                <div className="flex flex-col items-end space-y-0.5">
                  <h1>{players[currentPlayerIndex].average.toFixed(2)}</h1>
                  <h1>{players[currentPlayerIndex].legWins}</h1>
                  <h1>{players[currentPlayerIndex].setWins}</h1>
                  <h1>{players[currentPlayerIndex].dartsCount}</h1>
                </div>
              </div>
            </div>

            <div className="w-1/2 flex flex-col items-center">
              <h1 className="text-3xl">{players[currentPlayerIndex].playerName}</h1>
              <h1 className="text-2xl">{players[currentPlayerIndex].points}</h1>
            </div>

          </div>

          {possibleOutKeys.includes(players[currentPlayerIndex].points) ? (
            <p className=" font-normal  text-s  p-2 whitespace-nowrap bg-gray-600">
              {players[currentPlayerIndex].out}
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col w-full min-h-10 max-h-44 overflow-scroll no-scrollbar justify-between gap-1 border-1 border-black text-white border-b-2">
          {players &&
            players.map((player, index) => (
              <PlayerGameDetails
                key={player.id}
                player={player}
                possibleOutKeys={possibleOutKeys}
                highlighted={currentPlayerIndex == index}
              />
            ))}
        </div>

        <div
          id="score-container"
          className="flex justify-center w-36 mt-2 gap-2 "
        >
          <input
            type="text"
            id="score-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={3}
            className="border w-20 p-2"
            disabled
          />
          <button
            className="border rounded-md p-4 w-40 text-white bg-orange-600 hover:text-slate-200 "
            onClick={handleSubmitScore}
          >
            SUBMIT
          </button>
        </div>

        <div className="text-3xl max-sm:text-xl mt-2">
          <PinPad value={inputValue} onValueChange={setInputValue} />
        </div>
      </section>
    </main>
  );
};

export default Game;

import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { possibleOuts } from "../constants/index.js";
import WinPage from "./WinPage.jsx";

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
        setStartingPlayerIndex(startingPlayerIndex + 1)
        setPlayers(playersWithResetedPoints);
        setCurrentPlayerIndex(
          (startingPlayerIndex + 1) % currentPlayers.length
        );
      }
    } else {
      let playersWithResetedPoints = playersCopy.map((player) => {
        return { ...player, points: points };
      });
      setStartingPlayerIndex(startingPlayerIndex + 1)
      console.log(startingPlayerIndex)
      setPlayers(playersWithResetedPoints);
      setCurrentPlayerIndex(
        (startingPlayerIndex + 1) % currentPlayers.length
      );
    }
  }

  function handleSubmitScore() {
    let playersCopy = [...players];
    let currentPlayer = playersCopy[currentPlayerIndex];
    let numberToSubtract = parseInt(inputValue, 10);

    if (!isNaN(numberToSubtract) && numberToSubtract < 180) {
      currentPlayer.dartsCount+=3;
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
    }else {
      alert('Invalid score')
      setInputValue("")
    }
  }

  // Function to handle digit clicks
  const handleDigitClick = (digit) => {
    if (inputValue.length < 3) {
      setInputValue((prevValue) => prevValue + digit);
    }
  };

  // Function to handle delete action
  const handleDeleteClick = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  return winSection ? (
    <WinPage players={players} currentPlayerIndex={currentPlayerIndex}/>
  ) : (
    <main className="flex flex-col justify-center items-center mt-5">
      <section id="game" className="flex flex-col items-center game-section">
        <div className="flex flex-row justify-center gap-10 text-white mb-3 text-xs sm:text-lg">
          <p>{points}, Double Out, First to:</p>
          <p>Legs: {leg}</p>
          <p>Sets: {set}</p>
        </div>

        <div className="flex flex-row gap-10 justify-between flex-wrap text-white">
          {players &&
            players.map((player, index) => (
              <div
                key={player.playerName}
                className={`flex flex-col w-40 max-md:w-24 h-32 justify-start items-center border rounded-lg p-1
              ${currentPlayerIndex == index ? "bg-black" : ""}
            `}
              >
                {player.playerName}
                <h1 className="text-2xl">{player.points}</h1>
                <div className="text-xxs sm:text-xs">
                  <div className="flex flex-row gap-3">
                    <h1>Leg: {player.legWins}</h1>
                    <h1>🎯: {player.dartsCount}</h1>
                  </div>
                  <div>
                    <h1>Set: {player.setWins}</h1>
                  </div>
                  
                  
                </div>

                {possibleOutKeys.includes(player.points) ? (
                  <p className=" font-normal max-sm:text-xxs max-md:text-xs border-1 p-1 whitespace-nowrap bg-gray-600">
                    {player.out}
                  </p>
                ) : (
                  <></>
                )}
              </div>
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
        <table>
  <tbody className="border border-black bg-gray-400">
    {/* First three rows */}
    {[0, 1, 2].map((row, i) => (
      <tr key={i} className="border border-black">
        {[1, 2, 3].map((col) => {
          const digit = row * 3 + col;
          return (
            <td
              key={digit}
              className="border border-black text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
              onClick={() => handleDigitClick(digit)}
            >
              {digit}
            </td>
          );
        })}
      </tr>
    ))}

    {/* Last row with delete and 0 */}
    <tr className="border border-black">
      <td
        className="border border-black w-32 h-4 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
        onClick={handleDeleteClick}
      >
        <FontAwesomeIcon icon={faDeleteLeft} />
      </td>
      <td
        className="border border-black w-32 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
        onClick={() => handleDigitClick(0)}
      >
        0
      </td>
      <td className="border border-black w-32 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"></td>
    </tr>
  </tbody>
</table>

        </div>
      </section>
    </main>
  );
};

export default Game;

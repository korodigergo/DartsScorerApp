import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayersSettings = ({ currentPlayers, onCurrentPlayerChange }) => {
  const navigate = useNavigate();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers();
  }, []);

  async function getAllPlayers() {
    try {
      const response = await fetch("/api/players/all");
      const players = await response.json();
      setPlayers(players);
    } catch (error) {
      console.log(error);
    }
  }

  async function addNewPlayer(newName) {
    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName: newName,
      }),
    });
    getAllPlayers();
  }

  return (
    <section className="common-section">
      <div
        id="player-settings-title"
        className="absolute top-2 left-2 flex flex-row gap-2 "
      >
        <span>
          <FontAwesomeIcon icon={faGear} />
        </span>
        <h2 className="bold text-nowrap">Players Settings</h2>
        <button
          className="border rounded-md w-40 max-sm:w-20 max-sm:h-7 max-sm:text-xxs text-white bg-orange-600 hover:opacity-90 ml-10 max-sm:ml-1"
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          LEADERBOARD
        </button>
      </div>
      <div
        id="players-container"
        className="flex-grow overflow-scroll bg-slate-300 w-full mt-10 rounded-b-xl p-3"
      >
        <div className="relative w-1/2">
          <input
            id="new-player-input"
            type="text"
            className="w-full h-8 border-2 border-black rounded-lg pr-8 pl-3 py-2 max-sm:text-xs"
            placeholder="Add player"
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => {
              addNewPlayer(newPlayerName);
              document.getElementById("new-player-input").value = "";
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-gray-500 cursor-pointer hover:text-black"
            />
          </span>
        </div>

        <div
          id="players-list"
          className="mt-4 flex justify-around flex-wrap flex-row gap-2"
        >
          {players &&
            players.map((player) => {
              const isSelected = currentPlayers.includes(player);
              return (
                <div
                  key={player.playerName}
                  className={`cursor-pointer hover:bg-blue-300 hover:text-slate-600 border-1 border-black rounded-lg w-fit p-2 text-white ${
                    isSelected ? "bg-blue-500" : "bg-slate-600"
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      onCurrentPlayerChange(
                        currentPlayers.filter((p) => p !== player)
                      );
                    } else {
                      onCurrentPlayerChange([...currentPlayers, player]);
                    }
                  }}
                >
                  <h2>{player.playerName}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default PlayersSettings;

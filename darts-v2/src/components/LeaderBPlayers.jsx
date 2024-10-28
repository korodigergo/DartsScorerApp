import React from 'react'
import { useEffect } from "react";
import { useState } from "react";

const LeaderBPlayers = () => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    getAllPlayers();
  }, []);

  async function getAllPlayers() {
    try {
      const response = await fetch("/api/players/leaderboard");
      const players = await response.json();
      setPlayers(players);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
          <ul>
            {players &&
              players.map((player) => (
                <li
                  key={player.id}
                  className="flex flex-row items-center w-52 justify-between"
                >
                  <h2>{player.playerName}</h2>
                  <h2>{player.wins}</h2>
                </li>
              ))}
          </ul>
        </div>
  )
}

export default LeaderBPlayers
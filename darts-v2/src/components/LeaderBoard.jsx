import { useEffect } from "react";
import { useState } from "react";

const LeaderBoard = () => {
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
    <main className="flex flex-col justify-center items-center w-screen">
      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl">LEADERBOARD</h1>
        <ul className="flex flex-row items-center w-52 justify-between text-orange-600 text-xl">
          <li>Player name</li>
          <li>Wins</li>
        </ul>
      </div>
      <main className="flex flex-col justify-start overflow-scroll max-h-96 h-96 items-center mt-2 relative w-fit p-5 shadow-[0_15px_30px_0px_rgba(0,0,0,0.3)] border rounded-xl bg-white">
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
      </main>
    </main>
  );
};

export default LeaderBoard;

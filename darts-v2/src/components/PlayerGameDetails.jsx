import React from "react";

const PlayerGameDetails = ({player, highlighted}) => {
  return (
    <div
      id={`${player.id}`}
      className={`flex flex-row w-full gap-2 justify-around items-center p-1
              ${highlighted ? "bg-black" : ""}
            `}
    >
      <h1 className="w-1/2">{player.playerName}</h1>
      <h1 className="text-2xl ">{player.points}</h1>
      
    </div>
  );
};

export default PlayerGameDetails;

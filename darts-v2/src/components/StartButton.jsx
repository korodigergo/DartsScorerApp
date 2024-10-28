import { useNavigate } from "react-router-dom";

const StartButton = ({ leg, set, points, currentPlayers }) => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game", { state: { leg, set, points, currentPlayers } });
  };

  return (
    <div>
      <button
        className="border rounded-md p-4 w-40 text-white bg-orange-600  hover:opacity-90"
        onClick={startGame}
      >
        Start match
      </button>
    </div>
  );
};

export default StartButton;
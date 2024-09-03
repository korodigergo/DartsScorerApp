import { useNavigate } from "react-router-dom";


const WinPage = ({players, currentPlayerIndex}) => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center mt-5">
      <section id="game" className="flex flex-col items-center game-section">
        <div>{players[currentPlayerIndex].playerName} wins!</div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          BACK TO MAIN PAGE
        </button>
      </section>
    </main>
  )
}

export default WinPage
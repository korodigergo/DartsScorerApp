
import BackSign from "./BackSign";
import LeaderBPlayers from "./LeaderBPlayers";

const LeaderBoard = () => {
  

  return (
    <main className="flex flex-col justify-center items-center w-screen">
      <BackSign/>
      <div className="mt-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl">LEADERBOARD</h1>
        <ul className="flex flex-row items-center w-52 justify-between text-orange-600 text-xl">
          <li>Player name</li>
          <li>Wins</li>
        </ul>
      </div>
      <main className="flex flex-col justify-start overflow-scroll max-h-96 h-96 items-center mt-2 relative w-fit p-5 shadow-[0_15px_30px_0px_rgba(0,0,0,0.3)] border rounded-xl bg-white">
        <LeaderBPlayers/>
      </main>
    </main>
  );
};

export default LeaderBoard;

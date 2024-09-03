
import { useState } from 'react';
import GameSettings from './components/GameSettings'
import PlayersSettings from './components/PlayersSettings'
import StartButton from './components/StartButton'

function App() {
  const [leg, setLeg] = useState(1);
  const [set, setSet] = useState(1);
  const [points, setPoints] = useState(501);
  const [currentPlayers, setCurrentPlayers] = useState([]);


  return (
    <main className='p-4 flex flex-col justify-center items-center '>
      <h1 className='font-extrabold text-3xl max-sm:text-xl mb-10 max-sm:mb-2'>DARTS SCORER🎯</h1>
      <div className=' flex max-md:flex-col flex-row gap-4'>
        <PlayersSettings
          currentPlayers={currentPlayers}
          setCurrentPlayers={setCurrentPlayers}
        />
        <GameSettings
          leg={leg} 
          setLeg={setLeg} 
          set={set} 
          setSet={setSet} 
          points={points} 
          setPoints={setPoints}
          
        />
      </div>
      <div className='mt-14 max-md:mt-6'>
        <StartButton
          leg={leg} 
          set={set} 
          points={points}
          currentPlayers={currentPlayers}
        />
      </div>
    </main>
  )
}

export default App

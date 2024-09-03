import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Game from './components/Game.jsx';
import LeaderBoard from './components/LeaderBoard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    children: [
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

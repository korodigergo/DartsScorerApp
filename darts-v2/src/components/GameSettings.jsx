import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const GameSettings = ({ leg, setLeg, set, setSet, points, setPoints }) => {

  const handleLegChange = (event) => {
    setLeg(event.target.value);
  };

  const handleSetChange = (event) => {
    setSet(event.target.value);
  };

  const handlePointChange = (event) => {
    setPoints(event.target.value);
  };

  return (
    <section className="common-section">
      <div
        id="player-settings-title"
        className="absolute top-2 left-2 flex flex-row gap-2"
      >
        <span>
          <FontAwesomeIcon icon={faSliders}/>
        </span>
        <h2 className="bold">Game Settings</h2>
      </div>
      <div id="game-settings" className="flex-grow flex flex-col items-center bg-slate-300 w-full mt-10 rounded-b-xl p-3 gap-3 ">
        {[
          { name: "Leg", values: [1, 2, 3], state: leg, handler: handleLegChange },
          { name: "Set", values: [1, 2, 3], state: set, handler: handleSetChange },
          { name: "Points", values: [501, 401, 301], state: points, handler: handlePointChange },
        ].map((element) => (
          <div key={element.name} className="w-1/2 font-bold text-2xl">
          <FormControl fullWidth >
            <InputLabel>{element.name}</InputLabel>
            <Select
              label={element.name}
              value={element.state}
              onChange={element.handler}
            >
              {element.values.map((value) => (
                <MenuItem key={value} value={value} >{value}</MenuItem>
              ))}
            </Select>
          </FormControl>

          </div>
        ))}
      </div>
    </section>
  );
};

export default GameSettings;

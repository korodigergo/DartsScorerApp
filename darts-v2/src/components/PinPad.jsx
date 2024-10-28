import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const PinPad = ({ value, onValueChange }) => {
  // Function to handle digit clicks
  const handleDigitClick = (digit) => {
    if (value.length < 3) {
      onValueChange(`${value}${digit}`);
    }
  };

  // Function to handle delete action
  const handleDeleteClick = () => {
    onValueChange(value.slice(0, -1));
  };

  return (
    <table>
      <tbody className="border border-black bg-gray-400">
        {[0, 1, 2].map((row, i) => (
          <tr key={i} className="border border-black">
            {[1, 2, 3].map((col) => {
              const digit = row * 3 + col;
              return (
                <td
                  key={digit}
                  className="border border-black text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
                  onClick={() => handleDigitClick(digit)}
                >
                  {digit}
                </td>
              );
            })}
          </tr>
        ))}
        <tr className="border border-black">
          <td
            className="border border-black w-32 h-4 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
            onClick={handleDeleteClick}
          >
            <FontAwesomeIcon icon={faDeleteLeft} />
          </td>
          <td
            className="border border-black w-32 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"
            onClick={() => handleDigitClick(0)}
          >
            0
          </td>
          <td className="border border-black w-32 max-sm:w-20 text-center align-middle p-7 cursor-pointer hover:bg-gray-500 ease-in-out duration-200"></td>
        </tr>
      </tbody>
    </table>
  );
};

export default PinPad;

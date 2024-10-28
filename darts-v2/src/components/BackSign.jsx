import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackSign = () => {
  const navigate = useNavigate();
  const jumpBackToHome = () => {
    navigate("/");
  };
  return (
    <div 
      className='absolute left-20 top-20 p-5 border-2 rounded-full cursor-pointer hover:bg-slate-500'
      onClick={jumpBackToHome}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  )
}

export default BackSign
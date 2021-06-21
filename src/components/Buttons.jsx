import React from "react";
import "./Buttons.css";

function Button(props) {
  return (
    <button
      className={ `button 
      ${props.operator ? "operator" : ""} 
      ${props.doubleCol ? "doubleCol" : ""} 
      ${props.doubleRow ? "doubleRow" : ""} 
      ${props.lightOperator ? "lightOperator" : ""} `}
      
      onClick={evento => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  );
}

export default Button;

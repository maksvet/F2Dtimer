import React from "react";
const Timer = (props) =>{
    const minutes = Math.floor(props.time / 60);
    const seconds = props.time % 60;
    return(
        <div className="Timer">{minutes}:{seconds.toString().padStart(2, '0')}</div>
    );
}
export default Timer;
import React from "react";
const Timer = (props) =>{
    return(
        <div className="Timer">{props.time.toFixed(2)}</div>
    );
}
export default Timer;
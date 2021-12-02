import React from "react";

function Label(props) {
    return (
        <div onClick={props.clicked} >
            <span className="mx-auto d-flex text-center ">{props.lapTime}</span>
        </div>
    );
}

export default Label;

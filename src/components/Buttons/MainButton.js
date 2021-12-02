import React from "react";

function MainButton(props) {
    return (
        <div className="d-flex flex-column mb-3">
<button
        onClick={props.clicked}
        className="btn btn-primary"
    >
        {props.children}
    </button>
        </div>
        
    );
}

export default MainButton;

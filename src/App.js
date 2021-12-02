import React from "react";
import Timer from "./containers/Timer/Timer";
function App() {
  return (
    <div>
      <h1 className="h1 text-center alert alert-primary  fw-bolder" style={{color: 'red'}}>Redux stopwatch</h1>
      <div>
      <Timer />
      </div>
      
    </div>
  )
}
export default App;
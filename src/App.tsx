import React from 'react';
import './App.css';
import {start} from "./api";

function App() {
  return (
    <div className="App">
      <button onClick={start}>start</button>
    </div>
  );
}

export default App;

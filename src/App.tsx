import React from 'react';
import './App.css';
import useApi from './useApi';
import { stat } from 'fs';

function App() {
  const { status, getData } = useApi();
  return (
    <div className="App">
      <button onClick={getData}>start</button>
      <div>{status}</div>
    </div>
  );
}

export default App;

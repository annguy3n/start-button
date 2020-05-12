import React from 'react';
import './App.css';
import { start, getStatus } from './api';
import { stat } from 'fs';

function useApi() {
  const [status, setStatus] = React.useState({
    status: 'NOTHING',
    estimatedTime: 0,
  });

  getStatus().then((response) => {
    setStatus(status);
  });

  const getData = () => {
    start().then((resp) => {
      const { ok, status, estimatedTime } = resp;
      if (ok) {
        setStatus({
          status,
          estimatedTime,
        });
      }
    });
  };

  return {
    ...status,
    getData,
  };
}

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

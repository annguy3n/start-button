import React from 'react';
import './App.css';
import { start, getStatus } from './api';
import { stat } from 'fs';

function useApi() {
  const [status, setStatus] = React.useState({
    status: 'NOTHING',
    estimatedTime: 0,
  });

  // Define a ref object to avoid a timer to be created
  // on every component update
  const timer = React.useRef<number>(0);

  const checkStatus = () => {
    getStatus().then((response) => {
      if (status.status !== response.status) {
        // @ts-ignore
        setStatus(response);
        if (response.status === 'Done') {
          clearInterval(timer.current);
        }
      }
    });
  };

  const runStatusPoll = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    // @ts-ignore
    timer.current = setInterval(checkStatus, 5000);
  };

  const getData = () => {
    start().then((resp) => {
      const { ok, status, estimatedTime } = resp;
      if (ok) {
        setStatus({
          status,
          estimatedTime,
        });
        runStatusPoll();
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

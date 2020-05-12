import React from 'react';
import './App.css';
import { start, getStatus, Status } from './api';
import { stat } from 'fs';

type ApiStatusResponse = {
  ok: boolean;
  status: Status;
  estimatedTime: number;
};

function useApi() {
  const [status, setStatus] = React.useState<Partial<ApiStatusResponse>>({
    status: null,
    estimatedTime: 0,
  });

  // Define a ref object to avoid a timer to be created
  // on every component update
  const timer = React.useRef<number>(0);

  const checkStatus = () => {
    getStatus().then((response: Partial<ApiStatusResponse>) => {
      if (status.status !== response.status) {
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
    // Need to use the explicit window object reference here
    // to satisfy the TypeScript compiler and correct fix
    // the evaluated type returned by setInterval
    timer.current = window.setInterval(checkStatus, 5000);
  };

  const getData = () => {
    start().then((resp) => {
      const { ok, status, estimatedTime } = resp as ApiStatusResponse;
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

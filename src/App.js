import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import threeHelper from './lib/threeHelper';


function App() {
  useEffect(() => {
    threeHelper();
  }, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;

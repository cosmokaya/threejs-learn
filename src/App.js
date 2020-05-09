import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import ThreeHelper from './lib/threeHelper';


function App() {
  useEffect(() => {
    new ThreeHelper();
  }, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;

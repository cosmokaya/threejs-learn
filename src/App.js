import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import ThreeHelper from './lib/threeHelper';
// import { Tween, autoPlay } from 'es6-tween'

function App() {
  useEffect(() => {
    new ThreeHelper();
  }, [])

  useEffect(() => {

  }, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;

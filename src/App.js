import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button
        type="button"
        onClick={() => {
          fetch('/.netlify/functions/sample');
        }}
      >
        Click Me!
      </button>
    </div>
  );
}

export default App;

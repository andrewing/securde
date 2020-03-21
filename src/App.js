import React from 'react';
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
        Click Me! And check network!
      </button>
    </div>
  );
}

export default App;

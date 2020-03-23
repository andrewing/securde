import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <button
        type="button"
        onClick={async () => {
          /* SAMPLE POST REQUEST */
          /* 
            await fetch('http://localhost:9000/book/create', {
              method: 'POST',
              body: JSON.stringify({
                title: 'book title',
                author: ['Stanley'],
                publisher: 'DLSU',
                yearOfPublication: 2020,
                ISBN: '12930203234',
                callNumber: '004'
              })
            }).then(response => {
              console.log("response", response)
            }).catch(err => {
              console.log(err)
            }) 
          */

          /* SAMPLE GET REQUEST */
          /* 
            await fetch('http://localhost:9000/book/get', {
              method: 'GET'
            }).then(response => {
              console.log(response.json())
            }).catch(err => {
              console.log(err)
            })
          */

          /* SAMPLE REQUEST WITH PARAMS ON PATH */
          /*
            await fetch('http://localhost:9000/book/get?title=bookname&author=Stanley', {
              method: 'GET'
            }).then(response => {
              console.log(response.json())
            }).catch(err => {
              console.log(err)
            })
          */
        }}
      >
        Click Me! And check network!
      </button>
    </div>
  );
}

export default App;

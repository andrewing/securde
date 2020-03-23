/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import routes from './routes/routes';
import './index.css';
import './App.css';

const App = () => {
  const mainPages = routes.map(route => (
    <Route
      key={route.key}
      exact={route.exact}
      path={route.path}
      component={route.component}
      {...routes}
    />
  ));

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
      <Switch>{mainPages}</Switch>
    </div>
    // <div className="App">
    //   <button
    //     type="button"
    //     onClick={() => {
    //       fetch('/.netlify/functions/sample');
    //     }}
    //   >
    //     Click Me! And check network
    //   </button>
    // </div>
  );
};

export default App;

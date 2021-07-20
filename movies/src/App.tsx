import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import "./style.scss";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;

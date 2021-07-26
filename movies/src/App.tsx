import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import SearchResult from './components/SearchResult';
import Input from './components/Input';
import "./style.scss";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/search' component={SearchResult}/>
        <Route exact path='/upload' component={Input}/>
      </Switch>
    </div>
  );
}

export default App;

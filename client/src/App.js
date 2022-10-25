import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Home from './components/Home'
import Detail from './components/Detail'
import Create from './components/Create'


function App() {
  return (
    
    <div className="App">
      <NavBar/>
      <Switch>
      <Route exact path={"/"} render={() => <LandingPage />} />
      <Route exact path={"/home"} render={() => <Home />} />
      <Route path="/pokemons/:id" render={() => <Detail />} />
      <Route path={"/create"} render={() => <Create />} />
      </Switch>
    </div>
  );
}

export default App;

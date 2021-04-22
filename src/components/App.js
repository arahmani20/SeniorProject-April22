import "../styles/App.css";

import React, { Component } from "react";
import Board from "./Board";
import Navbar from "./Navbar";
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filehub from "./Filehub/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import project from "./project";

//store the token of login
import Login from './Login/Login'; //import login
import useToken from './Login/useToken';

//class App extends React.Component {
function App(){
    
  const { token, setToken } = useToken(); //login token
  if(!token){   //display login if the token is falsy
    return <Login setToken={setToken}/>
  }

 // render(){
    return (

      <div className="App">

       <Router>
         <Navbar/>
         <Switch>
           <Route path='/' exact component={Home} />
           <Route path='/taskmanager' component={Board} />
           <Route path='/project' component={project} />
           <Route path='/filehub' component={Filehub} />
         </Switch>
       </Router>
      </div>

    );
 // }
}

export default App;

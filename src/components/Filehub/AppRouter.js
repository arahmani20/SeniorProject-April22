import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './AppMain';
import Header from './Header';
import FilesList from './FilesList';
import './Filehub.css';



const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header
        Header/> 
      
      <div className="main-content">
        <Switch>
          <Route component={App} path="/" exact={true} />
          <Route component={FilesList} path="/list" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;

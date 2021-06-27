import React from 'react';
import './App.css';

import { List } from './list/List';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Search from './search/Search';
import Navigation from './navigation/Navigation';

function App() {
  return (
    <div className="App">
      <div className="sidenav">
        <Navigation />
      </div>
      <div className="header">
        <Breadcrumb />
      </div>
      <div className="search">
        <Search />
      </div>
      <div className="body">
        <List />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import { List } from './list/List';

function App() {
  return (
    <div className="App">
      <div className="sidenav"></div>
      <div className="breadcrumb"></div>
      <div className="search"></div>
      <div className="body">
        <List />
      </div>
    </div>
  );
}

export default App;

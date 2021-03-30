import React from 'react';
import './App.scss';

import HomeComponent from './components/home/home.component'
import LoginComponent from './components/login/login.component'

const App = () => {
  return (
    <div className="App">
      <LoginComponent />
    </div>
  );
}

export default App;

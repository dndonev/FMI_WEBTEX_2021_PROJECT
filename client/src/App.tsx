import React from 'react';
import './App.scss';

import HomeComponent from './components/home/home.component'
import MainComponent from './components/main/main.component'
import RegisterModal from './components/register/register.componet';
import SharedWithMeComponent from './components/shared-with-me/shared.component';

const App = () => {
  return (
    <div className="App">
      <RegisterModal />
    </div>
  );
}

export default App;

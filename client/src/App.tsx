import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';

import HomeComponent from './components/home/home.component'
import LoginComponent from './components/login/login.component'
import { store } from './redux/store';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    </div>
  );
}

export default App;

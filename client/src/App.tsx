import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import HomeComponent from './components/home/home.component'
import MainComponent from './components/main/main.component';
import UploadComponent from './components/upload/upload.component';
import { store } from './redux/store';
import ForgotPasswordModal from './components/forgot-password/forgot-password.modal'
const App = () => {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={HomeComponent} />
            <Route exact path='/main' component={MainComponent} />
            <Route exact path='/upload' component={UploadComponent} />
            {/* TODO: Uncomment when pages are ready and create Private Routes */}
            {/*<Route exact path='shared-with-me' component={SharedWithMe}/>*/}
            {/*<Route exact path='file-upload' component={ContentUpload} */}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;

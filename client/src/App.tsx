import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import HomeComponent from './components/home/home.component'
import MainComponent from './components/main/main.component';
import { store } from './redux/store';
import { User } from './redux/user/user.types';
import { ConnectedRouter } from 'connected-react-router';
import { StoreState } from './redux/root-reducer';
import { selectCurrentUser } from './redux/user/user.selectors';

interface AppProps {
  currentUser: User;
  history: History;
}

const App = (props: AppProps) => {
  const { history, currentUser } = props;

  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/">
              {currentUser.email !== undefined ? <Redirect to="/main" /> : <HomeComponent />}
            </Route>
            <Route exact path='/main' component={MainComponent} />
            <Route exact path='/' component={HomeComponent} />
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
  return {
    currentUser: selectCurrentUser(state)
  }
}

export default connect(mapStateToProps, null)(App);

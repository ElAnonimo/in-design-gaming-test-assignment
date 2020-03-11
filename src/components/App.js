import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
// import { Container } from 'reactstrap';
import Landing from './Landing';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import '@/styles/global.scss';
import { ActivityIndicator } from 'antd-mobile';
import { store } from '@/core/store';
import { history } from '@/core/router';

// 代码分割惰性加载
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const SportUserEdit = React.lazy(() => import('./pages/sportUserEdit'));

const App = () => {
  return (
    <Suspense fallback={(
      <div className="global-loading">
        <ActivityIndicator size="large" />
      </div>
    )}
    >
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sportUser/:id" component={SportUserEdit} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </Suspense>
  );
};

const Container = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Container, document.getElementById('root'));

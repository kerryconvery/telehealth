import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ApiProvider from './api/apiProvider';
import createHttpClient from './api/httpClient';
import config from '../config.json';

const httpClient = createHttpClient('http://localhost:3000');

ReactDOM.render(
  <ApiProvider httpClient={httpClient} >
    {api => <App api={api} />}
  </ApiProvider>,
  document.getElementById('app')
);

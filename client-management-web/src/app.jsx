import React from 'react';
import { object } from 'prop-types';
import { Router } from "@reach/router";
import ApplicationTemplate from './application-template/applicationTemplate';
import ClientManagementPage from './client-management-page/clientManagementPage';
import ClientRegistrationPage from './client-registration-page/clientRegistrationPage';

const App = ({ api }) => (
  <ApplicationTemplate>
    <Router>
      <ClientManagementPage path='/' getClients={api.getClientsRequest} />
      <ClientRegistrationPage path='/clients' />
    </Router>
  </ApplicationTemplate>
)

App.propTypes = {
  api: object
}

export default App;
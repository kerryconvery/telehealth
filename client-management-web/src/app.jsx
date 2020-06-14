import React from 'react';
import { object } from 'prop-types';
import { Router } from "@reach/router";
import ApplicationTemplate from './application-template/applicationTemplate';
import ClientManagementPage from './client-management-page/clientManagementPage';
import ClientRegistrationPage from './client-registration-page/clientRegistrationPage';
import { routes } from './navigation';

const App = ({ api }) => (
  <ApplicationTemplate>
    <Router>
      <ClientManagementPage path={routes.clientManagement} getClients={api.getClientsRequest} />
      <ClientRegistrationPage path={routes.clientRegistration} />
    </Router>
  </ApplicationTemplate>
)

App.propTypes = {
  api: object
}

export default App;
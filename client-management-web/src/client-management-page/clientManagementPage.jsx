import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import StandardPageTemplate from '../common-components/standard-page-template/standardPageTemplate';
import ClientList from './client-list/clientList';

const ClientManagementPage = ({ getClients }) => {
  const [ clients, setClients ] = useState();

  useEffect(() => getClients().then(setClients), []);

  console.log('clients', clients);
  
  return (
    <StandardPageTemplate
      title='Client management'
      actions={<Button variant='contained' color='primary'>Register Client</Button>}
    >
      <ClientList clients={clients} />
    </StandardPageTemplate>
  )
}

ClientManagementPage.propTypes = {
  getClients: func.isRequired,
}

export default ClientManagementPage;
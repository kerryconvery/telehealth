import React from 'react';
import Button from '@material-ui/core/Button';
import StandardFormTemplate from '../../common-components/standard-form-template/standardFormTemplate';

const ClientRegistrationForm = () => (
  <StandardFormTemplate
    title='Client registration'
    actions={[
      <Button variant='contained' color='primary'>Register</Button>,
      <Button  variant='contained' color='secondary' >Cancel</Button>,
    ]}
  >

  </StandardFormTemplate>
)

export default ClientRegistrationForm;
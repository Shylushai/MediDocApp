import './App.css';

import { Amplify } from 'aws-amplify';
import {Authenticator, components} from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import { fetchUserAttributes } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css'

import SiteFooter from './components/common/SiteFooter';
import SiteNav from './components/common/SiteNav';

Amplify.configure(awsExports);

async function getName() {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes.name);
    if (userAttributes.name === 'doctor') {
      console.log('works');
      }
      else {
      console.log('no work');
      }

    return userAttributes.name;
}
getName()



function App() {


  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut, user }) => (
    <div>
          <SiteNav/>
          <SiteFooter />
    </div>
  )}
    </Authenticator>
  );
}

export default App;

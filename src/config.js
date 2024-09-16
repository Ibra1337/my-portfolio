import { WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
  authority: 'https://ec2-18-159-207-136.eu-central-1.compute.amazonaws.com:8443/realms/myrealm',
  clientId: 'portfolio-opid',
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'code',
  scope: 'openid profile',
  post_logout_redirect_uri: 'http://localhost:3000/',
  autoSignIn: false ,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  usePKCE: true, 
};

export default oidcConfig
import { WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
  authority: 'http://localhost:8080/realms/myrealm',
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
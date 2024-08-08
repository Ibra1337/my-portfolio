export const oidcConfig = {
  authority: 'http://localhost:8080/realms/myrealm',
  clientId: 'portfolio-opid',
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'code',
  scope: 'openid profile',
  autoSignIn: false,
};

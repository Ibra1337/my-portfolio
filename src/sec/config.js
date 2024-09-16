// config/oidc-config.js
import { WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
  authority: 'https://ec2-18-159-207-136.eu-central-1.compute.amazonaws.com:8443/realms/myrealm', // Your Keycloak realm URL
  client_id: 'portfolio-opid', // Your Keycloak client ID
  redirect_uri: 'http://localhost:3000/callback', // Where Keycloak should redirect after login
  response_type: 'code', // Authorization code flow
  scope: 'openid profile offline_access', // Include 'offline_access' for refresh tokens
  post_logout_redirect_uri: 'http://localhost:3000/', // Redirect after logout
  userStore: new WebStorageStateStore({ store: window.localStorage }), // Store session in localStorage
  usePKCE: true, // PKCE is recommended for security
  automaticSilentRenew: true, // Enable automatic silent renew of tokens
  silent_redirect_uri: 'http://localhost:3000/silent-renew', // URL for silent renew
  loadUserInfo: true, // Load additional user info from the OIDC provider
};

export default oidcConfig;

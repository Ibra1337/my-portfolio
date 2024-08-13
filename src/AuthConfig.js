import { UserManager } from 'oidc-client';
import CookieStorage from './CookieStorage';
import  oidcConfig  from './config';

const userManagerConfig = {
  ...oidcConfig,
  //userStore: new CookieStorage(), // Custom storage implementation
};

const userManager = new UserManager(userManagerConfig);
export default userManager;
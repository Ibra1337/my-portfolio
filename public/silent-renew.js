// public/silent-renew.js
import { userManager } from './sec/UserManager';

userManager.signinSilentCallback().catch((error) => {
  console.error('Silent renew error:', error);
});

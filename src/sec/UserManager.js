// sec/userManager.js
import { UserManager } from 'oidc-client-ts';
import oidcConfig from './config';

export const userManager = new UserManager(oidcConfig);

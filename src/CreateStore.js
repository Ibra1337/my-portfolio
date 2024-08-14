import  createStore  from 'react-auth-kit'; // Import directly from 'react-auth-kit'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

export default store;

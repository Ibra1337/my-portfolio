import React, { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from './UserManager';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const refreshTimeoutRef = useRef(null); // Ref to store the timeout identifier

  useEffect(() => {
    const loadUser = async () => {
      const loadedUser = await userManager.getUser();
      if (loadedUser) {
        setUser(loadedUser);
        setToken(loadedUser.access_token);
        scheduleTokenRefresh(loadedUser);
      }
    };

    loadUser();

    userManager.events.addUserLoaded((loadedUser) => {
      setUser(loadedUser);
      setToken(loadedUser.access_token);
      scheduleTokenRefresh(loadedUser);
    });

    userManager.events.addUserUnloaded(() => {
      clearTimeout(refreshTimeoutRef.current);
      setUser(null);
      setToken(null);
    });

    // Cleanup event listeners and timeout on component unmount
    return () => {
      clearTimeout(refreshTimeoutRef.current);
      userManager.events.removeUserLoaded();
      userManager.events.removeUserUnloaded();
    };
  }, []);

  const scheduleTokenRefresh = (user) => {
    const expiresIn = user.expires_at * 1000 - Date.now() - 60000; // Refresh 1 minute before expiry

    if (expiresIn > 0) {
      clearTimeout(refreshTimeoutRef.current); // Clear any existing timeout
      refreshTimeoutRef.current = setTimeout(() => {
        userManager.signinSilent()
          .then((newUser) => {
            setUser(newUser);
            setToken(newUser.access_token);
            scheduleTokenRefresh(newUser); // Schedule the next refresh
            console.log("Token refreshed successfully");
          })
          .catch((error) => {
            console.error('Silent token renewal failed:', error);
            logout(); // Optionally log the user out if refresh fails
          });
      }, expiresIn);
    } else {
      logout(); // Log the user out if the token has already expired
    }
  };

  const login = () => {
    userManager.signinRedirect();
  };

  const logout = () => {
    clearTimeout(refreshTimeoutRef.current); // Clear any existing timeout
    userManager.signoutRedirect();
    setUser(null);
    setToken(null);
    navigate('/login'); // Optionally redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

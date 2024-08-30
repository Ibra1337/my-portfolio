import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from './UserManager';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const loadedUser = await userManager.getUser();
      if (loadedUser) {
        setUser(loadedUser);
        scheduleTokenRefresh(loadedUser);
      }
    };

    loadUser();

    userManager.events.addUserLoaded((loadedUser) => {
      setUser(loadedUser);
      scheduleTokenRefresh(loadedUser);
    });

    userManager.events.addUserUnloaded(() => {
      setUser(null);
    });

    // Cleanup event listeners on component unmount
    return () => {
      userManager.events.removeUserLoaded();
      userManager.events.removeUserUnloaded();
    };
  }, []);

  const scheduleTokenRefresh = (user) => {
    const expiresIn = user.expires_at * 1000 - Date.now() - 60000; // Refresh 1 minute before expiry
    if (expiresIn > 0) {
      setTimeout(() => {
        userManager.signinSilent()
          .then((newUser) => {
            setUser(newUser);
            scheduleTokenRefresh(newUser); // Schedule the next refresh
            console.log("token refreshed successfully")
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
    userManager.signoutRedirect();
    setUser(null);
    navigate('/login'); // Optionally redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

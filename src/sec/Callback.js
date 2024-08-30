// sec/Callback.js
import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from './UserManager';
import { AuthContext } from './AuthProvider';

const Callback = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Track whether the callback has already been processed
  const callbackProcessed = useRef(false);

  // Retrieve counters from localStorage or initialize to 0
  const [successCount, setSuccessCount] = useState(() => parseInt(localStorage.getItem('successCount')) || 0);
  const [failureCount, setFailureCount] = useState(() => parseInt(localStorage.getItem('failureCount')) || 0);

  // State to hold the token
  const [token, setToken] = useState(null);
  // State to indicate if the authentication process is ongoing
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure callback is only processed once
    if (callbackProcessed.current) return;

    callbackProcessed.current = true;

    // Check if the user is already authenticated
    userManager.getUser().then((existingUser) => {
      if (existingUser) {
        // User is already authenticated, no need to process the callback again
        console.log("User is already authenticated");
        setUser(existingUser);
        setToken(existingUser.access_token);
        setIsLoading(false); // Stop loading since the user is already authenticated

        // Redirect to the original page after authentication
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);

      } else {
        console.log("Authenticating");
        // User is not authenticated, proceed with the callback
        userManager.signinRedirectCallback()
          .then((authenticatedUser) => {
            setUser(authenticatedUser); // Set the authenticated user in context

            const newSuccessCount = successCount + 1;
            setSuccessCount(newSuccessCount);
            localStorage.setItem('successCount', newSuccessCount); // Persist success count

            // Set the token
            setToken(authenticatedUser.access_token);

            setIsLoading(false); // Set loading to false once the process is complete

            // Redirect to the original page after authentication
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectUrl);

          })
          .catch(error => {
            console.error('Error during authentication callback:', error);
            const newFailureCount = failureCount + 1;
            setFailureCount(newFailureCount);
            localStorage.setItem('failureCount', newFailureCount); // Persist failure count

            setIsLoading(false); // Set loading to false even if there was an error

          });
      }
    });
  }, [setUser, navigate, successCount, failureCount]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Success Count: {successCount}</p>
          <p>Failure Count: {failureCount}</p>
          {token && <p>Access Token: {token}</p>} {/* Display the token if available */}
        </>
      )}
    </div>
  );
};

export default Callback;

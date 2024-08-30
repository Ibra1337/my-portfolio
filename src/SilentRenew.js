import React from 'react';
import { useEffect } from 'react';
import { useOidc } from 'oidc-react';

const SilentRenew = () => {
  const oidc = useOidc();

  useEffect(() => {
    oidc.signinSilentCallback();
  }, [oidc]);

  return <div>Silent renew in progress...</div>;
};

export default SilentRenew;

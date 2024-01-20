import { KindeProvider } from "@kinde-oss/kinde-auth-react";

import React from 'react'

const KindeAuthProvider = ({ children }) => {
  return (
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
      isDangerouslyUseLocalStorage={import.meta.env.DEV}
    >
      {children}
    </KindeProvider>
  )
}

export default KindeAuthProvider
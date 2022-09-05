import { createContext, useContext, useMemo, useState } from "react";

export const LoginContext = createContext();

export const useUserContext = () => {
  return useContext(LoginContext);
};

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contextToken, setContextToken] = useState(null);

  const store = {
    isLoggedIn,
    setIsLoggedIn,
    contextToken,
    setContextToken,
  };

  return (
    <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
  );
};

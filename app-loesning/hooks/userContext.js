import { createContext, useContext, useMemo, useState } from "react";

export const LoginContext = createContext();

export const useUserContext = () => {
  return useContext(LoginContext);
};

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const store = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
  );
};

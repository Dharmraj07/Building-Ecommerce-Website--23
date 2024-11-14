import { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const storedLoginTime = localStorage.getItem("loginTime");

  const [token, setToken] = useState(initialToken);

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    const loginTime = new Date().getTime();
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", loginTime);
  };

  useEffect(() => {
    if (storedLoginTime) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - storedLoginTime;
      const fiveMinutes = 5 * 60 * 1000;

      if (timeElapsed > fiveMinutes) {
        // Auto logout if more than 5 minutes have passed
        logoutHandler();
      }
    }
  }, [storedLoginTime, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

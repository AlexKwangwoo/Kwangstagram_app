import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext();
//context는 object라고 상상해보자. 함수를 포함하는 object!
// true, false등을 포함하는.. 이는 어디든지 접근가능하다!

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  // isLoggedIn이 중복이름이라 바꿔줌!
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      //isLoggedIn 이거는 asyncStorage에 스트링만 저장됨!!
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };
  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      //isLoggedIn 이거는 asyncStorage에 스트링만 저장됨!!
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // AuthContext 파일에있는 AuthContext을 사용할것임!!(createContext())을 했었던!
  return isLoggedIn;
};
export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};
export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

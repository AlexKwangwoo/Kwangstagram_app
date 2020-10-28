import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
// import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ThemeProvider } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";

// AppLoading은 return했을때 계속해서 로딩하는 컴포넌트임!
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    // await AsyncStorage.clear(); //로그인 저장한거 삭제.. 처음부터 테스트 할때사용!
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync([require("./assets/logo.png")]);
      //많은 이미지를 둘수있기에 배열로 한다!
      //이게 다되면 apollomemory에 있는 cache를 사용해 새로운 cache를 만듬
      const cache = new InMemoryCache(); //캐시만들기
      await persistCache({
        cache,
        storage: AsyncStorage,
      }); //지속으로 데이터 저장하기!
      //처음에는 storage있는지 확인 있으면 데이터를 가져오고 없으면 만든다!
      const client = new ApolloClient({
        cache, //위에서 만든 캐시를 가져온다!
        request: async (operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          }); // 쿼리를통해 백앤드를 접근할때 토큰을 인증 받아야한다!
        }, // 로그인됐을때만 사용할수있는 쿼리가 있기 때문에 처음 로그인할때 발생함!
        // 그래서 새로고침하면 정사적으로 진행되는데.. 이를 고쳤음! 바로 먹히게끔!
        // 두번째 들어갈때는 persistCache를 이용해 토큰이 바로 적용됨을 알수있다!
        ...apolloClientOptions,
      }); //캐쉬를 가진 client를 만들거임!
      //client가 만들어지면 로드가 true가 될것임
      //cache를 가져온client가 이제는 setClient에 들어갈것임!
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      //AsyncStorage는 폰에서 동작하는 로컬스토리지임
      if (!isLoggedIn || isLoggedIn === "false") {
        //isLoggedIn 이거는 asyncStorage에 스트링만 저장됨!!
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);
  //처음 component가 mount되면 loaded는 false, client는 null이 된다!

  return loaded && client && isLoggedIn !== null ? (
    //isLoggedIn이 null이 아니면 실행될것이다!
    // <AuthProvider isLoggedIn={isLoggedIn}> 를 프롭으로 준다!
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

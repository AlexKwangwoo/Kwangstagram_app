import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
// import * as Google from "expo-google-app-auth";
// import * as Facebook from "expo-facebook";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const GoogleContainer = styled.View`
  margin-top: 20px;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", "")); //저장된 이메일을 가져옴!
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput; //lastname은 없어도됨
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      //결과는 boolean을 리턴한다!
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email }); //유저네임이 있으면 로그인창으로! 이메일가지고!
    } finally {
      setLoading(false);
    }
  };
  // 페이스북 공사중
  // const fbLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync(
  //       "2437846576444335", //facebookDEV appid
  //       {
  //         permissions: ["public_profile", "email"],
  //       }
  //     );
  //     if (type === "success") {
  //       //맞다면 페이스북에서 토큰을 줄것임
  //       const response = await fetch(
  //         `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
  //       );
  //       Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
  //       const { email, first_name, last_name } = await response.json();
  //       updateFormData(email, first_name, last_name);
  //       setLoading(false);
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // };

  //구글 for ios
  // const googleLogin = async () => {
  //   const GOOGLE_ID =
  //     "219403306028-70218srp3petnm57sfhbdj3ijg9n929i.apps.googleusercontent.com";
  //   try {
  //     setLoading(true);
  //     const result = await Google.logInAsync({
  //       iosClientId: GOOGLE_ID,
  //       scopes: ["profile", "email"],
  //     });
  //     if (result.type === "success") {
  //       const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //         headers: { Authorization: `Bearer ${result.accessToken}` },
  //       });
  //       const { email, family_name, given_name } = await user.json();
  //       updateFormData(email, given_name, family_name);
  //     } else {
  //       return { cancelled: true };
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignup} text="Sign up" />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={() => null} // 페이스북 공사중
            text="Connect Facebook"
          />
        </FBContainer>
        <GoogleContainer>
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={() => null} //구글 공사중
            text="Connect Google"
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

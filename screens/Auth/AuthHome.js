import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  height: ${constants.height / 7}px;
`;

const Touchable = styled.TouchableOpacity``;
//touchableopacity는 터치만 가능!
// 그래서 안에 View가 필요하다!

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  margin-top: 20px;
`;

//네비게이션갈곳이름! () => navigation.navigate("Login") 이름같아야함!!
export default ({ navigation }) => (
  <View>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/Instalogo.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);

{
  /* <Text>Auth Home</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
      <Text>Go to Signup</Text>
    </TouchableOpacity> */
}

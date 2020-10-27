import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn(); // hook은 함수안에서 못써서 여기서 정의후 써야함!
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email"),
      //화면이 바껴서 email정보를 잃어버리기에 가져와야한다!
    },
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
        //navigation.navigate 해야하는데 여기서 자동으로 리렌더해줌!
        // useLogIn() 속의 isLoggedIn true가 되면서 메인(navController)에서 true가 일어나
        // 화면이 자동으로 바뀜!
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can't confirm secret");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
      </View>
    </TouchableWithoutFeedback>
  );
}; //로그인창 밖에 누르면 input커서 안가게 할 수 있다! dismiss에 의해! 바깥클릭시!

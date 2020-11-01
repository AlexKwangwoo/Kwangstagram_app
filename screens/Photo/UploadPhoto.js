import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import styled from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";
import { useMutation } from "@apollo/react-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  }); //사진 업로드후 새로고침바로 해서 feed화면에서 바로 보일수있게함!

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    //마치 form인것 처럼 행동함! html처럼
    const name = photo.filename;
    const [, type] = name.split("."); //두개로 나뉘면 앞의건 빈칸에가고 뒤는 type에감!
    formData.append("file", {
      name,
      type: "image/jpeg", //type.toLowerCase(),
      uri: photo.uri,
    }); //넣을 파일을 만들어준다!
    //파일이 어떻게 생겼는지 확인할필요가 있다!
    try {
      setIsLoading(true);
      const {
        data: { location }, //백엔드 upload에서 전송된 파일안에 location을 가져온다!
      } = await axios.post("http://192.168.0.39:5000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(location);
      // setFileUrl(location); //데이터를 패쓰한다!
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      Alert.alert("Cant upload", "Try later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};

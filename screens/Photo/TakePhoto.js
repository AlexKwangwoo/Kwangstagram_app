import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { TouchableOpacity, Platform } from "react-native";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.View``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  //버튼누르고 저장하는동안 다시 사진못찍게 하기!
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false); //이때는 사진못찍게 하기!
      const { uri } = await cameraRef.current.takePictureAsync({
        //사진찍는것!
        quality: 1, //사진 크기가 1이여서 정사각형으로 찍힘!
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      //사진찍은걸 저장하는법
      setCanTakePhoto(true); //끝나면 사진 다시 찍을수있게 하기!
      navigation.navigate("Upload", { photo: asset });
      //사진찍으면 바로 업로드 로 넘어간다!
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true); //이때는 사진찍게하기!
    }
  };
  //사진찍는거 셀카로 전환하기!
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA); //카메라 접근!
      console.log(status);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              justifyContent: "flex-end",
              padding: 15,
              width: constants.width,
              height: constants.height / 2,
            }}
          >
            <TouchableOpacity onPress={toggleType}>
              <Icon>
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-reverse-camera"
                      : "md-reverse-camera"
                  }
                  size={32}
                  color={"white"}
                />
              </Icon>
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

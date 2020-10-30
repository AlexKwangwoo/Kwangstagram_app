import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";

const PhotoBox = styled.View`
  height: ${constants.height / 6}px;
`;

// display: flex;
//   flex-direction: row;
//   width: ${constants.height / 6}px;
//   height: ${constants.height / 6}px;

const SquarePhoto = (
  { navigation, files = [], id } //{...post}안에 다 들어가있다
) => {
  // console.log("haha");
  return (
    <PhotoBox>
      <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
        <Image
          source={{ uri: files[0].url }} //post의 처음 그림 가져옴!
          style={{ width: constants.width / 3, height: constants.height / 6 }}
        />
      </TouchableOpacity>
    </PhotoBox>
  );
};

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default withNavigation(SquarePhoto); //이것을 통해 navigation props를 가질수있다!

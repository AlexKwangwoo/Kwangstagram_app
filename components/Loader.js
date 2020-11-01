import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${constants.height / 2.5}px;
`;

export default () => (
  <Container>
    <ActivityIndicator color={styles.blackColor} />
  </Container>
);

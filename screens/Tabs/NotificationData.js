import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import { formatDate } from "../../utils";

const Username = styled.Text`
  font-weight: 500;
`;
const Date = styled.Text``;

const Text = styled.Text`
  margin-left: 10px;
`;

const DivDown = styled.View`
  height: 40px;
  display:flex
  flex-direction:row;
  align-items:center;
  margin-left:15px;
  margin-top:15px;
`;

const DateTime = styled.Text`
  color: gray;
  font-size: 10px;
`;

export default (followers) => {
  return followers.posts.map((post) => (
    <DivDown key={post.createdAt}>
      <Image
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          // borderWidth: 2,
          // borderColor: "#c72e90",
        }}
        source={{ uri: post.user.avatar }}
      />
      <Text>
        <Username>{post.user.username}</Username>
        <Date> '{post.caption}' post.</Date>
        <DateTime> '{formatDate(post.createdAt)}'</DateTime>
      </Text>
    </DivDown>
  ));
};

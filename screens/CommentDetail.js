import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";
import { Image, Platform } from "react-native";
import { formatDate } from "../utils";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View`
  background-color: white;
  height: 100%;
`;

const TextBox = styled.View`
  margin-left: 10px;
`;

const DateTop = styled.Text`
  color: grey;
  font-size: 11px;
`;

const CaptionBox = styled.View`
  border: 1px solid #dbdbdb;
  margin-top: -1px;
  margin-left: -1px;
  margin-right: -1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const CaptionText = styled.Text``;
const Username = styled.Text`
  font-weight: 600;
`;
const Text = styled.Text``;

const CommentBox = styled.View`
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
`;
export default ({ navigation }) => {
  const comments = navigation.getParam("comments");
  const caption = navigation.getParam("caption");
  const user = navigation.getParam("user");
  const createdAt = navigation.getParam("createdAt");
  // console.log(comments);
  return (
    <View>
      <ScrollView>
        <CaptionBox>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
          <TextBox>
            <Username>{user.username}</Username>
            <CaptionText>{caption}</CaptionText>
            <DateTop>{formatDate(createdAt)}</DateTop>
          </TextBox>
        </CaptionBox>
        {comments.map((comment) => (
          <CommentBox key={comment.id}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={{ uri: comment.user.avatar }}
            />
            <TextBox>
              <Username>{comment.user.username}</Username>
              <Text>{comment.text}</Text>
              <DateTop>{formatDate(comment.createdAt)}</DateTop>
            </TextBox>
          </CommentBox>
        ))}
      </ScrollView>
    </View>
  );
};

import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
// fragment사용! 안에 postparts있음!
const View = styled.View`
  background-color: white;
  height: 100%;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") },
  });
  return (
    <View>
      <ScrollView styled={{ flex: 1 }}>
        {loading ? (
          <Loader />
        ) : (
          data && data.seeFullPost && <Post {...data.seeFullPost} />
        )}
      </ScrollView>
    </View>
  );
};

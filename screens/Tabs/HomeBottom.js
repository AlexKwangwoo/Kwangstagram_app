import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native"; // 새로고침방법!!
import styled from "styled-components";
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragments";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

// const View = styled.View`
//   justify-content: center;
//   align-items: center;
//   flex: 1;

//   background: white;
// `;

// const Text = styled.Text``;

const View = styled.View`
  background-color: white;
  height: 100%;
  padding-bottom: 110px;
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  // console.log(loading, data); //들어오는 객체 확인!
  // useQuery 안에 데이터 다시 들고오게하는 refetch 기능이 있다!
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch(); //이것이 다시 데이터를 들고 오게하는 함수임!
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View>
      <ScrollView
        refreshControl={
          //refreshcontrol 컴포넌트를 요구한다! refreshing = refresh할까말까
          //onRefresh => 어떻게 하면되는데? 작동방식
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        } //이부분이 당겼을때 리프레쉬를 일으킨다!!
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.seeFeed &&
          data.seeFeed.map((post) => <Post key={post.id} {...post} />)
        )}
      </ScrollView>
    </View>
  );
};

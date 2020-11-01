import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/react-hooks";
import UserProfile from "../../components/UserProfile";
import styled from "styled-components";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  background-color: white;
  height: 100%;
`;

//fragment사용하기위해 ...userParts 필요하고 밑에 $~~필요함<!DOCTYPE html>

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
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

  const { loading, data, refetch } = useQuery(ME);
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={refreshing} />
        }
      >
        {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
      </ScrollView>
    </View>
  );
};

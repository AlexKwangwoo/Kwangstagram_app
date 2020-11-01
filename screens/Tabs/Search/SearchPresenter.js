import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";
import { POST_FRAGMENT } from "../../../fragments";

//훅을 사용하기위해 컨터이너에 클래스넣고 여기에 는 const를 만듬
export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Flex = styled.View`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  // shouldFetch 가 true일때만 쿼리 요청. 타이핑일때는 요청 x
  // 서치 버튼을 클릭하면 onSubmit이 호출되고 shouldFetch를 true로 설정함
  if (term != "") {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEARCH, {
      variables: {
        term,
      },
      skip: !shouldFetch,
      fetchPolicy: "network-only", // 검색할때마다 네트워크 요청,, 저장안함!!
      // 저장하면 모든 검색 기록 저장이라 로딩화면 안나옴!!
    }); //shouldFetch false이면 그냥 검색안하고 넘김.. 즉 서브밋해야 skip이 false
    //되어 검색을 시작함!
    // console.log(data, loading);
    const onRefresh = async () => {
      //이건 당겨서 밑으로 내림시 refresh기능!
      try {
        setRefreshing(true);
        await refetch({ variables: { term } });
      } catch (e) {
      } finally {
        setRefreshing(false);
      }
    };
    return (
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <Flex>
          {loading ? (
            <Loader />
          ) : (
            data &&
            data.searchPost &&
            data.searchPost.map((post) => (
              <SquarePhoto key={post.id} {...post} />
            ))
          )}
        </Flex>
      </ScrollView>
    );
  } else {
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
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={refreshing} />
        }
      >
        <Flex>
          {loading ? (
            <Loader />
          ) : (
            data &&
            data.seeFeed &&
            data.seeFeed.map((post) => <SquarePhoto key={post.id} {...post} />)
          )}
        </Flex>
      </ScrollView>
    );
  }
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;

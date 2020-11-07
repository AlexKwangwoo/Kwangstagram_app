import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { Image } from "react-native";
import { trimText } from "../../utils";
import { withNavigation } from "react-navigation";

const GET_ME = gql`
  query me {
    me {
      id
      username
      avatar
      firstName
      following {
        id
        username
        avatar
        isFollowing
        firstName
      }
    }
  }
`;

const SlideBox = styled.View`
  margin-top: 50px;
  height: 75%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const View = styled.View`
  margin-top: -40px;
  margin-right:-2px
  margin-left:-2px
  height: 26%;
  background-color: white;
  border: 1px solid #dbdbdb;
`;
const ViewIOS = styled.View`
  margin-top: -40px;
  margin-right:-2px
  margin-left:-2px
  height: 22%;
  background-color: white;
  border: 1px solid #dbdbdb;
`;

const Text = styled.Text`
  margin-top: 3px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Touchable = styled.TouchableOpacity`
  align-items: center;
`;

const Hometop = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(GET_ME);
  return Platform.OS === "ios" ? (
    <ViewIOS>
      <ScrollView
        //  style={{ marginTop: -10, marginBottom: -10 }}
        contentContainerStyle={{
          paddingLeft: 10,
          // paddingBottom: -20,
          // paddingTop: -20,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.me &&
          data.me.following.map((following) => (
            <SlideBox key={following.id}>
              <Touchable
                onPress={() =>
                  navigation.navigate("UserDetail", {
                    username: following.username,
                  })
                } //여기서의 유저네임은 프로필클릭시 화면타이틀에 유저네임이 들어감 유저프로파일안의!!
              >
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: "#c72e90",
                  }}
                  source={{ uri: following.avatar }}
                />
                <Text>{trimText(following.username, 10)}</Text>
              </Touchable>
            </SlideBox>
          ))
        )}
      </ScrollView>
    </ViewIOS>
  ) : (
    <View>
      <ScrollView
        //  style={{ marginTop: -10, marginBottom: -10 }}
        contentContainerStyle={{
          paddingLeft: 10,
          // paddingBottom: -20,
          // paddingTop: -20,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.me &&
          data.me.following.map((following) => (
            <SlideBox key={following.id}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 60,
                  borderWidth: 3,
                  borderColor: "#c72e90",
                }}
                source={{ uri: following.avatar }}
              />
              <Text>{trimText(following.username, 10)}</Text>
            </SlideBox>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default withNavigation(Hometop);

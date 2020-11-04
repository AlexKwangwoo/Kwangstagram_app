import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { Image } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { ScrollView } from "react-native-gesture-handler";
import NotificationData from "./NotificationData";

const GET_ME = gql`
  query me {
    me {
      id
      username
      avatar
      firstName
      followers {
        id
        username
        avatar
        posts {
          createdAt
          user {
            avatar
            username
          }

          caption
        }
      }
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Div = styled.View`
  height: 40px;
  display:flex
  flex-direction:row;
  align-items:center;
  margin-left:15px;
  margin-top:15px;
`;
const ControllBox = styled.View``;

const Username = styled.Text`
  font-weight: 500;
`;
const Date = styled.Text``;

const Text = styled.Text`
  margin-left: 10px;
`;
const SmallBox = styled.View`
  height: 100%;
`;

const BigBox = styled.View`
  height: 100%;
`;

const StartText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  margin-top: 10px;
`;

const DownBox = styled.View``;

export default () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  return (
    <ControllBox>
      <BigBox>
        <StartText>About your followers</StartText>
        <ScrollView>
          <SmallBox>
            {data.me.followers.map((followers) => (
              <Div key={followers.id}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    // borderWidth: 2,
                    // borderColor: "#c72e90",
                  }}
                  source={{ uri: followers.avatar }}
                />
                <Text>
                  <Username>{followers.username}</Username>
                  <Date> started following you.</Date>
                </Text>
              </Div>
            ))}
          </SmallBox>
        </ScrollView>

        <StartText>About your followers' posts</StartText>
        <ScrollView>
          <SmallBox>
            {data.me.followers.map((followers) => (
              <DownBox key={followers.id}>
                <NotificationData {...followers} />
              </DownBox>
            ))}
          </SmallBox>
        </ScrollView>
      </BigBox>
    </ControllBox>
  );

  // data &&
  //   data.me &&
  //   data.me.followers.map((followers) => (
  //     <Div
  //       key={followers.id}
  //       // id={followers.id}
  //       // avatar={followers.avatar}
  //       // username={followers.username}
  //       // post={followers.post.caption}
  //       // createdAt={followers.post.createdAt}
  //     >
  //       <Avatar size="smmd" url={followers.avatar} />
  //       <Text>
  //         <Username>{followers.username}</Username>
  //         <Date>started following you.</Date>
  //       </Text>
  //       <Link to={`/${followers.username}`}>
  //         <ProfileButtonBox>
  //           <ButtonProfile>Check Profile</ButtonProfile>
  //         </ProfileButtonBox>
  //       </Link>
  //     </Div>
  //   ))
};

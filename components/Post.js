import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons, Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { gql } from "apollo-boost";
import styles from "../styles";
import { useMutation } from "@apollo/react-hooks";
import { withNavigation } from "react-navigation";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  margin-bottom: 10px;
`;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`; // 앱에서는 default flex direction이 column이다!

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 5px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  createdAt,
  comments = [],
  isLiked: isLikedProp,
  navigation,
}) => {
  //디폴트로 []빈 어레이
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p); //p = previous
    try {
      await toggleLikeMutaton();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          } //여기 누를시 탭네비게이션의 유저디테일로 이동함!
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          } //여기서의 유저네임은 프로필클릭시 화면타이틀에 유저네임이 들어감 유저프로파일안의!!
        >
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        showsPagination={false}
        style={{ height: constants.height / 2.5 }}
      >
        {files.map((file) => (
          <Image
            style={{ width: constants.width, height: constants.height / 2.5 }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={24}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Feather
                color={styles.blackColor}
                size={24}
                name={
                  Platform.OS === "ios" ? "message-circle" : "message-circle"
                }
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable
          onPress={() =>
            navigation.navigate("CommentDetail", {
              comments: comments,
              caption: caption,
              user: user,
              createdAt: createdAt,
            })
          }
        >
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default withNavigation(Post);

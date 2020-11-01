import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Detail from "../screens/Detail";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import styled from "styled-components";
import constants from "../constants";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const Image = styled.Image`
  width: ${constants.width / 4.5}px;
  height: ${constants.height / 7}px;
`;

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig,
        },
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          headerTintColor: styles.blackColor, //tint는 모든 Detail안에 적용됨!
          title: "Photo",
        },
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("username"),
        }), //home화면에서 아바타누르면 유저 프로필로 이동하는 화면 만듬!
      },
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles },
        headerTitleAlign: "center",
      },
    }
  ); // home search add Notifications Profile 이친구들은
// tab안에있었고.. stack에 있지 않아 슬라이드가 되질않았다.
// 함수를 통해 탭속에 스택을 넣어줄것이다!

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        //여기는 스택네비게이션의 환경설정이다. top
        headerRight: () => <MessagesLink />,
        headerTitle: () => (
          <Image
            resizeMode="contain"
            source={require("../assets/Instalogo.png")}
          />
        ),
        headerTitleAlign: "center",
      }),
      navigationOptions: {
        //여기는 탭의 환경설정이다
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        ),
      },
    },
    Search: {
      screen: stackFactory(Search, {
        headerBackTitle: null, //서치했을때 나오는 맨위에 타이틀을 없앰!
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        ),
      },
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={30}
            name={
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline"
            }
          />
        ),
      },
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications",
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
          />
        ),
      },
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile",
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        ),
      },
    },
  },
  {
    // initialRouteName: "Profile",
    //탭네비게이션의 처음시작화면은 어디? 프로필로하세요임!
    tabBarOptions: {
      showLabel: false,
      Style: {
        backgroundColor: "Black",
      },
    },
  }
);

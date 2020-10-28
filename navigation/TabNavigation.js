import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import styled from "styled-components";
import constants from "../constants";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const Image = styled.Image`
  width: ${constants.width / 4.5}px;
  height: ${constants.height / 7}px;
`;

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
        headerStyle: { ...stackStyles },
      },
    },
  }); // home search add Notifications Profile 이친구들은
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
      screen: stackFactory(Search),
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
    initialRouteName: "Search",
    tabBarOptions: {
      showLabel: false,
      Style: {
        backgroundColor: "#FAFAFA",
      },
    },
  }
);

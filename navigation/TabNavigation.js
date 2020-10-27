import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig },
    },
  }); // home search add Notifications Profile 이친구들은
// tab안에있었고.. stack에 있지 않아 슬라이드가 되질않았다.
// 함수를 통해 탭속에 스택을 넣어줄것이다!

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Home",
      headerRight: () => <MessagesLink />,
    }),
  },
  Search: {
    screen: stackFactory(Search, {
      title: "Search",
    }),
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation"),
    },
  },
  Notifications: {
    screen: stackFactory(Notifications, {
      title: "Notifications",
    }),
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile",
    }),
  },
});

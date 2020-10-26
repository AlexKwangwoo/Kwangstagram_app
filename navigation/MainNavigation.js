import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
  },
  {
    headerMode: "none", //stacknavigator은 헤더를 가지고 있어서 중복된다!
    mode: "modal", // 밑에서 위로 올라오게 하고싶지만.. 안드로이드는 안됨!
  }
);

export default createAppContainer(MainNavigation);

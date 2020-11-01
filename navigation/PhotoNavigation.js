import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select",
      },
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take",
      },
    },
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor,
        marginBottom: 20,
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600",
      },
      style: {
        paddingBottom: 20,
        ...stackStyles,
      },
    },
    //phototabs부분   SelectPhoto,TakePhoto, 여기를 위에서 밑으로 내려준다!
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "Choose Photo",
        headerBackTitle: () => null,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      },
    },
    Upload: {
      screen: UploadPhoto,
      navigationOptions: {
        title: "Upload",
        headerBackTitle: () => null,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles,
      },
      headerTintColor: styles.blackColor,
    },
  }
);

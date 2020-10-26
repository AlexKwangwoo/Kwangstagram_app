import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto,
    TakePhoto,
  },
  {
    tabBarPosition: "bottom",
    //phototabs부분   SelectPhoto,TakePhoto, 여기를 위에서 밑으로 내려준다!
  }
);

export default createStackNavigator({
  PhotoTabs,
  UploadPhoto,
});

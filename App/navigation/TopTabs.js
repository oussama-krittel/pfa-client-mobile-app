import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FavorisScreen from "../Screens/FavorisScreen";
import RecentlyUsedScreen from "../Screens/RecentlyUsedScreen";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Favorites"
      initialLayout={{ width: Dimensions.get("window").width }}
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontWeight: "bold" }, // Customize label style
      }}
    >
      <Tab.Screen name="Favorites" component={FavorisScreen} />
      <Tab.Screen name="recently used" component={RecentlyUsedScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;

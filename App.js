import "react-native-gesture-handler";
import { Animated } from "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./App/navigation/MyDrawer";

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

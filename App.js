import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import store from "./App/context/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getPermissions, getAdreess } from "./App/styles/getLocation";

import MyDrawer from "./App/navigation/MyDrawer";

export default function App() {
  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}

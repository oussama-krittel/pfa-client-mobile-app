import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";

import Screen from "../Components/Screen";
import DrawerHeader from "../Components/DrawerHeader";
import LandingScreenHeader from "../Components/LandingScreenHeader";

import LandingScreen from "../Screens/LandingScreen";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="landing"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <DrawerHeader />
            <DrawerItemList {...props} />
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="landing"
        component={LandingScreen}
        options={{
          drawerLabel: "landing",
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <LandingScreenHeader title={title} style={options.headerStyle} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{ drawerLabel: "Updates" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: "Profile" }}
      />
    </Drawer.Navigator>
  );
}

function Feed() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </Screen>
  );
}

function Notifications() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </Screen>
  );
}

function Profile() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </Screen>
  );
}

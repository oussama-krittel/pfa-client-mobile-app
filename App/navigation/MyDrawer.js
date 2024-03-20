import React from "react";
import { Text, View } from "react-native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";

import colors from "../styles/colors";

import DrawerHeader from "../Components/DrawerHeader";
import Screen from "../Components/Screen";
import { Ionicons } from "@expo/vector-icons";
import LandingScreenStack from "./LandingScreenStack";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="landing"
      screenOptions={{
        drawerActiveTintColor: colors.secondary,
        drawerActiveBackgroundColor: colors.light,
        drawerLabelStyle: { marginLeft: -15 },
        headerStyle: {
          backgroundColor: colors.primary,
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
            <DrawerItem
              label={"LogOut"}
              icon={({ color, size }) => (
                <Ionicons
                  name="exit-outline"
                  size={size}
                  color={color}
                  style={{ marginRight: -15 }}
                />
              )}
            />
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        component={LandingScreenStack}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Rewards"
        component={Feed}
        options={{
          drawerLabel: "Rewards",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="near By"
        component={Map}
        options={{
          drawerLabel: "near By",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Area/Region"
        component={Notifications}
        options={{
          drawerLabel: "Area/Region",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="earth-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Feed() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Screen</Text>
    </Screen>
  );
}

function Notifications() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Screen</Text>
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

function Map() {
  return (
    <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </Screen>
  );
}

import React from "react";
import { Text, View } from "react-native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import DrawerHeader from "../Components/DrawerHeader";
import { Ionicons } from "@expo/vector-icons";

import MapScreenStack from "./MapScreenStack";
import colors from "../styles/colors";
import LandingScreenStack from "./LandingScreenStack";
import SearchScreen from "../Screens/SearchScreen";
import MyTabs from "./TopTabs";
import ProfileScreen from "../Screens/profileScreen";
import SecurityScreen from "../Screens/SecurityScreen";

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
        name="Search"
        component={SearchScreen}
        options={{
          drawerLabel: "Search",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={MyTabs}
        options={{
          drawerLabel: "Favorite",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        component={MapScreenStack}
        options={{
          headerShown: false,
          drawerLabel: "Our partners",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profile details",
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          drawerLabel: "Password & Security",
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="lock-closed-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

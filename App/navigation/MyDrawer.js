import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import DrawerHeader from "../Components/DrawerHeader";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MapScreenStack from "./MapScreenStack";
import colors from "../styles/colors";
import LandingScreenStack from "./LandingScreenStack";
import SearchScreen from "../Screens/SearchScreen";
import MyTabs from "./TopTabs";
import ProfileScreen from "../Screens/profileScreen";
import SecurityScreen from "../Screens/SecurityScreen";

const Drawer = createDrawerNavigator();

export default function MyDrawer({ navigation }) {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    // Function to show the alert
    const showAlert = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: () => executeLogout(),
          },
        ],
        { cancelable: false }
      );
    };

    // Function to execute logout
    const executeLogout = () => {
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({ ...userDetails, loggedIn: false })
      );
      navigation.navigate("LoginScreen");
    };

    // Show the alert
    showAlert();
  };

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
              onPress={logout}
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

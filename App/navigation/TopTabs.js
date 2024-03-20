import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="All"
      initialLayout={{ width: Dimensions.get("window").width }}
    >
      <Tab.Screen name="All" component={AllScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="deals" component={DealScreen} />
      <Tab.Screen name="points" component={Pointscreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;

// AllScreen component
const AllScreen = () => {
  return (
    <View style={styles.container}>
      <Text>All Screen</Text>
    </View>
  );
};

// FavoritesScreen component
const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
    </View>
  );
};

// DealScreen component
const DealScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Deal Screen</Text>
    </View>
  );
};

// Pointscreen component
const Pointscreen = () => {
  return (
    <View style={styles.container}>
      <Text>Points Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

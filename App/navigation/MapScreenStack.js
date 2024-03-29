import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import RestorantScreen from "../Screens/RestorantScreen";
import DichScreen from "../Screens/DichScreen";
import AppText from "../Components/AppText";
import colors from "../styles/colors";
import BasketScreen from "../Screens/BasketScreen";
import MapScreen from "../Screens/mapScreen";

const Stack = createStackNavigator();

function MapScreenStack(props) {
  return (
    <Stack.Navigator
    // mode="modal"
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="map Screen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestorantScreen"
        component={RestorantScreen}
        options={({ route }) => ({
          title: "",
          headerTransparent: true,
          headerTintColor: "#1DE8E1",
          headerRight: () => (
            <Ionicons
              name="heart-outline" //conditionnaly render name="heart"
              size={25}
              color={colors.primary}
              style={{ marginRight: 7 }}
            />
          ),
          // title: "restorant " + route.params.id,
        })}
      />
      <Stack.Screen
        name="dishScreen"
        component={DichScreen}
        options={({ navigation }) => ({
          presentation: "modal",
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 6,
                marginLeft: 8,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons
                name="close-outline"
                size={28}
                color={colors.secondary}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="basketScreen"
        component={BasketScreen}
        options={{ title: "Basket" }}
      />
    </Stack.Navigator>
  );
}

export default MapScreenStack;

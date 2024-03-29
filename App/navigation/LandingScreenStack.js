import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import LandingScreen from "../Screens/LandingScreen";
import SetLocationScreen from "../Screens/SetLocationScreen";
import RestorantScreen from "../Screens/RestorantScreen";
import DichScreen from "../Screens/DichScreen";
import AppText from "../Components/AppText";
import colors from "../styles/colors";
import BasketScreen from "../Screens/BasketScreen";
import MenuScreen from "../Screens/MenuScreen";
import RewardsScreen from "../Screens/RewardsScreen";
import SpecialOffersScreen from "../Screens/SpecialOffersScreen";

const Stack = createStackNavigator();

export default function LandingScreenStack() {
  return (
    <Stack.Navigator
    // mode="modal"
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetLocation"
        component={SetLocationScreen}
        options={{ title: "set your location" }}
      />
      <Stack.Screen
        name="menuScreen"
        component={MenuScreen}
        options={{ title: "Menu" }}
      />
      <Stack.Screen
        name="rewardsScreen"
        component={RewardsScreen}
        options={{ title: "Rewards" }}
      />
      <Stack.Screen
        name="specialOffersScreen"
        component={SpecialOffersScreen}
        options={{ title: "Special Offers" }}
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
      <Stack.Screen
        name="tutorielScreens"
        component={TutorielScreen}
        options={{ title: "Basket" }}
      />
    </Stack.Navigator>
  );
}

function TutorielScreen() {
  return (
    <View style={styles.container}>
      <AppText>tutorial</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./App/context/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getPermissions, getAdreess } from "./App/styles/getLocation";
import MyDrawer from "./App/navigation/MyDrawer";
import LoginScreen from "./App/Screens/LoginScreen";
import Loader from "./App/Components/Loader";
import RegistrationScreen from "./App/Screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState("");

  React.useEffect(() => {
    // setTimeout(() => {
    getPermissions();
    authUser();
    // }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("HomeScreen");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!initialRouteName ? (
          <Loader visible={true} />
        ) : (
          <>
            <Stack.Navigator
              initialRouteName={initialRouteName}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="HomeScreen" component={MyDrawer} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </Provider>
  );
}

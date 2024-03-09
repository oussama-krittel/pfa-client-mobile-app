import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import AppText from "./AppText";

const CustomHeader = ({ onNotificationPress }) => {
  const navigation = useNavigation();
  const onMenuPress = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressContainer}>
          <AppText
            style={styles.addressText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            hay tilila reu 22, residance taghazout
          </AppText>
          <Text
            style={styles.addressText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            agadir,
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNotificationPress}>
          <Ionicons name="notifications" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.SearchContainer}>
        <Ionicons name="search" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Recherche des restaurants ou des cafés..."
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    colore: "white",
  },
  container: {
    paddingTop: 33,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: "#f4511e",
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  topView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 11,
  },
  addressContainer: {
    width: 250,
    height: 50,
    overflow: "hidden",
  },
  addressText: {
    color: "white",
    fontWeight: "bold",
  },

  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
    width: "85%",
  },
  icon: {
    marginRight: 10,
  },
});

export default CustomHeader;

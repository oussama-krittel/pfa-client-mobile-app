import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import colors from "../styles/colors";
import AppText from "./AppText";
import { useSelector } from "react-redux";
import store from "../context/store";
import { useState, useEffect } from "react";

export default function LandingScreenHeader({
  openBottomSheet,
  scrollDirection,
  navigation,
}) {
  const location = useSelector((state) => state.location);

  store.subscribe(() => {
    console.log("store changed");
  });

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addressContainer}
          onPress={openBottomSheet}
        >
          {location ? (
            <>
              <AppText
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location.district},{location.street}
              </AppText>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location.city},{location.region}, {location.country},
              </Text>
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color="white"
                style={styles.locationIcon}
              />
              <Text style={styles.placeholderText}>Set your location </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("tutorielScreens")}
        >
          <Ionicons name="help-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={[
            styles.SearchContainer,
            // { height: 0, paddingVertical: 0, paddingHorizontal: 0 },
          ]}
        >
          <Ionicons name="search" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Recherche des restaurants ou des cafés..."
            placeholderTextColor="#ccc"
          />
        </View>
      </View>
    </View>
  );
}

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
    backgroundColor: colors.primary,
    // height: 155,
  },
  textInput: {
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
    marginTop: 3,
  },
  addressText: {
    color: "white",
    fontWeight: "bold",
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 11,
  },
  placeholderText: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },
  locationIcon: {
    fontSize: 25,
    marginBottom: 5,
  },

  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppText from "../Components/AppText";

function DrawerHeader(props) {
  return (
    <View style={styles.header}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>O</Text>
      </View>
      <AppText style={styles.headerText}>Hi Oussama,</AppText>
    </View>
  );
}

export default DrawerHeader;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 200,
    justifyContent: "center",
    backgroundColor: "#f4511e",
    paddingLeft: 16,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
});

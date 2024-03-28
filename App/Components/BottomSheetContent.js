import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";

import AppText from "./AppText";
import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";
import store from "../context/store";

function BottomSheetContent({ navigation }) {
  const location = useSelector((state) => state.location);

  store.subscribe(() => {
    console.log("store changed");
  });
  return (
    <View style={styles.Container}>
      <View style={styles.TextContainerStyle}>
        <AppText>Update your current location</AppText>
      </View>
      <TouchableOpacity
        style={styles.LocationBox}
        onPress={() => navigation.navigate("SetLocation")}
      >
        <View
          style={{
            height: 150,
            backgroundColor: colors.primary,
            marginHorizontal: 10,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude || 59 / 2,
              longitude: location.longitude || -13.9994 / 2,
              latitudeDelta: location.latitude ? 0.0922 : 9,
              longitudeDelta: location.latitude ? 0.0421 : 9,
            }}
            zoomEnabled={false}
            scrollEnabled={false}
          />
        </View>
        <AppText style={styles.TextStyle}>{location.formattedAddress}</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default BottomSheetContent;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  LocationBox: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(" + hexToRgb(colors.secondary) + ", 0.15)",
    height: "69%",
    width: "92%",
  },
  TextContainerStyle: {
    width: "92%",
    paddingLeft: 10,
    margin: 20,
  },
  TextStyle: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

import React, { useEffect } from "react";
import store from "../context/store";
import * as Location from "expo-location";
import { View, StyleSheet, Button, Linking } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";

import AppText from "./../Components/AppText";
import { getPermissions } from "../styles/getLocation";
import { locationSet } from "../context/location";
import colors from "../styles/colors";

function SetLocationScreen() {
  const location = useSelector((state) => state.location); // Accessing location state from Redux store

  const [address, setAddress] = React.useState("");

  const [markerLocation, setMarkerLocation] = React.useState(
    location.latitude ? location : { latitude: 0, longitude: 0 }
  );

  useEffect(() => {
    setAddress(location);
    console.log("adress changed");
    console.log(address);
  }, [location]);

  store.subscribe(() => {
    console.log("store changed");
  });

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerLocation({ latitude, longitude });
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const currentLocation = () => {
    getPermissions();
    setMarkerLocation(location);
  };

  const saveLocation = async () => {
    let currentAddress = await Location.reverseGeocodeAsync({
      latitude: markerLocation.latitude,
      longitude: markerLocation.longitude,
    });

    if (currentAddress && currentAddress.length > 0) {
      store.dispatch(
        locationSet({
          latitude: markerLocation.latitude,
          longitude: markerLocation.longitude,
          address: {
            street: currentAddress[0].street,
            district: currentAddress[0].district,
            city: currentAddress[0].city,
            region: currentAddress[0].region,
            country: currentAddress[0].country,
            formattedAddress: currentAddress[0].formattedAddress,
          },
        })
      );
    } else {
      console.log("No address found");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude || 59 / 2,
          longitude: location.longitude || -13.9994 / 2,
          latitudeDelta: location.latitude ? 0.0922 : 9,
          longitudeDelta: location.latitude ? 0.0421 : 9,
        }}
      >
        {markerLocation && (
          <Marker
            coordinate={{
              latitude: markerLocation.latitude || 64 / 2,
              longitude: markerLocation.longitude || -12.5994 / 2,
            }}
            draggable
            title={address ? address.city : "Unknown"}
            description={address ? address.formattedAddress : "Unknown Address"}
            onDragEnd={handleMarkerDrag}
          />
        )}
      </MapView>

      <BottomSheet
        // ref={bottomSheetRef}
        index={0}
        snapPoints={[200]}
        handleIndicatorStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      >
        <View style={styles.bottomSheetView}>
          {location.latitude && (
            <>
              <AppText
                style={styles.text}
              >{`adress: ${markerLocation.formattedAddress}`}</AppText>
              <Button title="device location" onPress={currentLocation} />
              <Button title="save location" onPress={saveLocation} />
            </>
          )}
          {!location.latitude && (
            <>
              <AppText style={styles.text}>
                drag the marker to set your location or press the button below
                to allow permissions to access your device location
              </AppText>
              <Button title="Open Settings" onPress={openAppSettings} />
            </>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 14,
    color: colors.dark,
    textAlign: "center",
  },
});

export default SetLocationScreen;

import React, { useRef, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Screen from "../Components/Screen";
import AppText from "../Components/AppText";

function SetLocationScreen() {
  const mapRef = useRef(null); // Reference to the map component

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.78825, // Initial latitude for the marker
    longitude: -122.4324, // Initial longitude for the marker
  });

  const onMarkerDragEnd = (e) => {
    // Update marker position when dragging ends
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  return (
    <Screen style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={markerPosition}
          onDragEnd={onMarkerDragEnd}
        />
      </MapView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SetLocationScreen;

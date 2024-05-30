import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {  useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";
import AppText from "../Components/AppText";

const { width, height } = Dimensions.get("window");

export default function MapScreen({ navigation }) {
  const restaurantData = useSelector((state) => state.restaurants);
  const mapRef = useRef(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleMarkerPress = (restaurant) => {
    const { latitude, longitude } = restaurant.location;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.95,
      longitudeDelta: 0.95,
    };
    mapRef.current.animateToRegion(region);
    setSelectedRestaurant(restaurant);
  };

  return (
    <View style={styles.container}>
      {/* X icon to navigate to landing page */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Our Partners</AppText>
        <View style={styles.rightEmptySpace} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 31.7917,
          longitude: -7.0926,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {restaurantData.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={restaurant.location}
            title={restaurant.name}
            onPress={() => handleMarkerPress(restaurant)}
          />
        ))}
      </MapView>

      {selectedRestaurant && (
        <TouchableOpacity
          style={styles.restaurantDetails}
          onPress={() =>
            navigation.navigate("RestorantScreen", {
              id: selectedRestaurant.id,
            })
          }
        >
          <Image
            source={selectedRestaurant.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={selectedRestaurant.coverImage}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
          <Text style={styles.cuisine}>
            Cuisine: {selectedRestaurant.cuisine}
          </Text>
          <Text style={styles.rating}>Rating: {selectedRestaurant.rating}</Text>
          <Text style={styles.priceRange}>
            Price Range: {selectedRestaurant.priceRange}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignItems: "center",
    height: 85,
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: "rgba(" + hexToRgb(colors.secondary) + ", 0.8)",
  },
  backButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  rightEmptySpace: {
    width: 40,
  },
  touchableContainer: {
    width: width,
  },
  restaurantDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(" + hexToRgb(colors.white) + ", 0.9)",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    zIndex: 1,
    alignItems: "center", // Center content horizontally
  },
  logo: {
    position: "absolute",
    top: 40, // Adjust as needed
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    borderRadius: 40, // Adjust as needed
    zIndex: 2,
  },
  coverImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "white",
    zIndex: 2,
    position: "absolute",
    top: 100,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  cuisine: {
    fontSize: 16,
    marginBottom: 2,
    color: colors.medium,
    textAlign: "center",
    zIndex: 1,
    width: "100%",
  },
  rating: {
    fontSize: 16,
    marginBottom: 2,
    color: colors.medium,
    textAlign: "center",
    zIndex: 1,
    width: "100%",
  },
  priceRange: {
    fontSize: 16,
    marginBottom: 2,
    color: colors.medium,
    textAlign: "center",
    zIndex: 1,
    width: "100%",
  },
});

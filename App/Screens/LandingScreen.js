import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetContent from "../Components/BottomSheetContent";
import LandingScreenHeader from "../Components/LandingScreenHeader";
import HorizontalScrollComponent from "../Components/HorizontalScrollComponent";

export default function LandingScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const data = [
    {
      id: 1,
      name: "Delizioso Italiano",
      location: { latitude: 31.7917, longitude: -7.0926 },
      coverImage: require("../../assets/image1.png"),
      logo: require("../../assets/logo2.png"),
      cuisine: "Italian",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Taco Paradise",
      location: { latitude: 33.9716, longitude: -6.8498 }, // Location in Morocco
      coverImage: require("../../assets/image3.jpeg"),
      logo: require("../../assets/logo.jpeg"),
      cuisine: "Mexican",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Sushi Haven",
      location: { latitude: 30.4278, longitude: -9.5981 }, // Location in Morocco
      coverImage: require("../../assets/image4.jpeg"),
      logo: require("../../assets/logo1.jpeg"),
      cuisine: "Japanese",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Burger Joint",
      location: { latitude: 34.0209, longitude: -6.8411 }, // Location in Morocco
      coverImage: require("../../assets/images.jpeg"),
      logo: require("../../assets/logo3.png"),
      cuisine: "American",
      rating: 4.0,
    },
    {
      id: 5,
      name: "Curry House",
      location: { latitude: 31.6333, longitude: -8.0 }, // Location in Morocco
      coverImage: require("../../assets/image2.jpeg"),
      logo: require("../../assets/logo2.png"),
      cuisine: "Indian",
      rating: 4.3,
    },
    {
      id: 6,
      name: "Seafood Delight",
      location: { latitude: 32.3106, longitude: -9.2362 }, // Location in Morocco
      coverImage: require("../../assets/image4.jpeg"),
      logo: require("../../assets/logo2.png"),
      cuisine: "Seafood",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Pho Noodle House",
      location: { latitude: 31.6356, longitude: -8.0083 }, // Location in Morocco
      coverImage: require("../../assets/image3.jpeg"),
      logo: require("../../assets/logo2.png"),
      cuisine: "Vietnamese",
      rating: 4.3,
    },
    {
      id: 166,
      name: "Pizza Palace",
      location: { latitude: 32.2995, longitude: -9.2371 },
      coverImage: require("../../assets/image4.jpeg"),
      logo: require("../../assets/logo2.png"),
      cuisine: "Pizza",
      rating: 4.6,
    },
  ];

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      <LandingScreenHeader
        openBottomSheet={openBottomSheet}
        navigation={navigation}
      />
      <TouchableOpacity
        style={[
          styles.overlay,
          { display: bottomSheetVisible ? "flex" : "none" },
        ]}
        activeOpacity={1}
        onPress={closeBottomSheet}
      />
      <ScrollView style={{ flex: 1 }}>
        <HorizontalScrollComponent
          title="Most popular"
          cards={data}
          navigation={navigation}
        />
        <HorizontalScrollComponent
          title="Most ratings"
          cards={data}
          navigation={navigation}
        />
        <HorizontalScrollComponent
          title="Near you"
          cards={data}
          navigation={navigation}
        />
        <HorizontalScrollComponent
          title="recomendations"
          cards={data}
          navigation={navigation}
        />
        <TouchableOpacity
          style={[
            styles.overlay,
            { display: bottomSheetVisible ? "flex" : "none" },
          ]}
          activeOpacity={1}
          onPress={closeBottomSheet}
        />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["40%"]}
        index={-1}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
        onClose={closeBottomSheet}
      >
        <BottomSheetContent navigation={navigation} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    flex: 1,
  },
});

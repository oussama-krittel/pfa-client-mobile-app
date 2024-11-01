import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import colors from "../styles/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "../Components/BottomSheetContent";
import LandingScreenHeader from "../Components/LandingScreenHeader";
import HorizontalScrollComponent from "../Components/HorizontalScrollComponent";

import { useDispatch, useSelector } from "react-redux";
import { addPoints, reducePoints } from "../context/restaurants";

import store from "../context/store";

const DATA_PER_LIST = 10;

const randomRecommendations = (data) => {
  const recommendations = [];
  for (let i = 0; i < DATA_PER_LIST; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    recommendations.push(data[randomIndex]);
  }
  return recommendations;
};

const getNearbyRestaurants = (data, userLocation) => {
  return data
    .map((restaurant) => ({
      ...restaurant,
      distance: parseFloat(
        (calculateDistance(userLocation, restaurant.location) / 1000).toFixed(2)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, DATA_PER_LIST);
};

const calculateDistance = (location1, location2) => {
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};

export default function LandingScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const userLocation = useSelector((state) => state.location);
  const data = useSelector((state) => state.restaurants);

  const dispatch = useDispatch();
  const handleAddPoints = (id, points) => {
    dispatch(addPoints({ id, points }));
  };
  const handleReducePoints = (id, points) => {
    dispatch(reducePoints({ id, points }));
  };

  store.subscribe(() => {
    console.log("store changed");
  });

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />
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
        <ScrollView style={styles.scrollView}>
          <HorizontalScrollComponent
            title="Recommendations"
            cards={randomRecommendations(data)}
            navigation={navigation}
          />
          <HorizontalScrollComponent
            title="Near You"
            distanceData={getNearbyRestaurants(data, userLocation).map(
              (restaurant) => restaurant.distance
            )}
            cards={getNearbyRestaurants(data, userLocation)}
            navigation={navigation}
          />
          <HorizontalScrollComponent
            title="Most Popular"
            cards={data.slice(0, DATA_PER_LIST)}
            navigation={navigation}
          />
          <HorizontalScrollComponent
            title="Most Ratings"
            cards={data
              .slice()
              .sort((a, b) => b.rating - a.rating)
              .slice(0, DATA_PER_LIST)}
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
  scrollView: {
    flex: 1,
  },
});

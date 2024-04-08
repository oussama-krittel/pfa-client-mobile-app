import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { basketCleared } from "../context/basket";
import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";
import store from "../context/store";
import Screen from "../Components/Screen";
import ParallaxScrollView from "../Components/ParallaxScrollView";
import AppText from "./../Components/AppText";

const restaurantInfo = {
  name: "Delicious Bites",
  coverImage: require("../../assets/image3.jpeg"),
  logo: require("../../assets/logo.jpeg"),
  rating: 4.5,
  likes: 1000,
  cuisine: "italien,morrocan",
  description:
    "A cozy restaurant serving delicious food from around the world.",
  instagram: "_ilal_",
  phoneNumber: "1234567890",
  email: "info@deliciousbites.com",
  location: "tilila agadir",
};

const VerticalMenu = ({ navigation }) => {
  const handlePhonePress = () => {
    Linking.openURL(`tel:${restaurantInfo.phoneNumber}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${restaurantInfo.email}`);
  };

  const handleInstagramPress = () => {
    Linking.openURL(`https://www.instagram.com/${restaurantInfo.instagram}`);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 4 }}>
        <AppText style={styles.appText}>Info</AppText>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
          {restaurantInfo.name}
        </Text>
        <Text style={{ fontSize: 15, marginBottom: 5, color: "grey" }}>
          {restaurantInfo.description}
        </Text>
        <Text style={{ fontSize: 15, marginBottom: 5 }}>
          cuisine: {restaurantInfo.cuisine}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          <FontAwesome name="star" size={19} color="gold" />{" "}
          {restaurantInfo.rating}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          <FontAwesome name="heart" size={18} color="red" />{" "}
          {restaurantInfo.likes}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5, color: "grey" }}>
          {" "}
          <FontAwesome name="map-marker" size={19} color="grey" />{" "}
          {restaurantInfo.location}
        </Text>
      </View>
      <View style={{ margin: 4 }}>
        <AppText style={styles.appText}>Make an Order</AppText>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("menuScreen")}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="restaurant-outline" size={24} color="black" />
            <AppText style={styles.menuItemText}>Menu</AppText>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("rewardsScreen")}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="gift-outline" size={24} color="black" />
            <AppText style={styles.menuItemText}>Rewards</AppText>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("specialOffersScreen")}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="fast-food-outline" size={24} color="black" />
            <AppText style={styles.menuItemText}>Special Offers</AppText>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 4 }}>
        <AppText style={styles.appText}>leave a Feedback</AppText>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("feedBackScreen")}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="file-tray-full-outline" size={24} color="black" />
            <AppText style={styles.menuItemText}>Feedback</AppText>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 150,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <AppText
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "rgba(" + hexToRgb(colors.secondary) + ", 0.8)",
            marginBottom: 30,
          }}
        >
          contact us
        </AppText>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handlePhonePress}>
            <Ionicons name="call-outline" size={30} color={colors.medium} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmailPress}>
            <Ionicons name="mail-outline" size={30} color={colors.medium} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInstagramPress}>
            <Ionicons name="logo-instagram" size={30} color={colors.medium} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function RestorantScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { totalPrice, selectedItemsCount } = useSelector(
    (state) => state.basket
  );
  store.subscribe(() => {
    console.log("store changed");
  });

  useEffect(() => {
    dispatch(basketCleared());
  }, []);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        backgroundColor={"#fff"}
        style={{ flex: 1 }}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <Image
            source={require("../../assets/image2.jpeg")}
            style={{ height: 300, width: "100%" }}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              marginTop: 110,
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={require("../../assets/logo2.png")}
              style={{
                height: 100,
                width: 100,
                borderRadius: 40,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "93%",
                marginBottom: 10,
                paddingLeft: 8,
              }}
            >
              <AppText style={{ color: "white" }}>B13 Restaurant</AppText>
              <AppText style={{ color: "white" }}>1033 pt</AppText>
            </View>
          </View>
        )}
        contentBackgroundColor={colors.light}
        renderStickyHeader={() => (
          <View key="sticky-header" style={[styles.stickySection]}>
            <AppText style={styles.stickySectionText}>B13 Restaurant</AppText>
            <AppText style={styles.stickySectionText2}>1033 pt</AppText>
          </View>
        )}
      >
        <VerticalMenu navigation={navigation} />
      </ParallaxScrollView>

      {/* basket */}
      {selectedItemsCount > 0 && (
        <View style={styles.footer}>
          <Screen>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => navigation.navigate("basketScreen")}
            >
              <Text style={styles.basket}>{selectedItemsCount}</Text>
              <Text style={styles.footerText}>View Basket</Text>
              <Text style={styles.basketTotal}>${totalPrice.toFixed(2)}</Text>
            </TouchableOpacity>
          </Screen>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appText: {
    margin: 7,
    fontWeight: "bold",
    fontSize: 20,
    color: "rgba(" + hexToRgb(colors.secondary) + ", 0.8)",
  },
  stickySection: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 65,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  stickySectionText: {
    flex: 1,
    maxWidth: "50%",
    fontSize: 20,
    fontWeight: "700",
  },
  stickySectionText2: {
    marginRight: 40,
  },
  stickySegments: {
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 4,
  },
  segmentsShadow: {
    backgroundColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    color: colors.medium,
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentScrollview: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 20,
    paddingBottom: 4,
  },
  footer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: "rgba(" + hexToRgb(colors.primary) + ", 0.9)",
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    height: 50,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  basket: {
    color: "#fff",
    fontWeight: "bold",
    padding: 8,
    fontSize: 18,
  },
  basketTotal: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  menuContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 5,
  },
});

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { basketCleared } from "../context/basket";

import colors from "../styles/colors";
import { hexToRgb } from "../styles/hexToRgb";
import store from "../context/store";
import Screen from "../Components/Screen";
import ParallaxScrollView from "../Components/ParallaxScrollView";
import Menu from "../Components/Menu";
import AppText from "./../Components/AppText";

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

  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const selectCategory = (index) => {
    setActiveIndex(index);
    const selected = itemsRef.current[index];
    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
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
        <View style={styles.detailsContainer}>
          <Menu DATA={DATA} navigation={navigation} />
        </View>
      </ParallaxScrollView>

      {/* stekySegment */}
      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentsShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentScrollview}
          >
            {DATA.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
                onPress={() => selectCategory(index)}
              >
                <AppText
                  style={
                    activeIndex === index
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  {item.title}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* baxket */}
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
});

//*****************************************   temporary data   ***********************************

const DATA = [
  {
    title: "Starters",
    data: [
      {
        id: 1,
        name: "Garlic Bread",
        info: "Toasted bread with garlic",
        price: 5.99,
        img: require("../../assets/image1.png"),
      },
      {
        id: 2,
        name: "Caesar Salad",
        info: "Fresh salad with Caesar dressing",
        price: 8.99,
        img: require("../../assets/image2.jpeg"),
      },
      // Add more starter items here if needed
      {
        id: 3,
        name: "Bruschetta",
        info: "Toasted bread topped with tomatoes, basil, and olive oil",
        price: 6.99,
        img: require("../../assets/image3.jpeg"), // Reusing the third image
      },
      {
        id: 4,
        name: "Mozzarella Sticks",
        info: "Fried mozzarella cheese sticks with marinara sauce",
        price: 7.99,
        img: require("../../assets/image4.jpeg"), // Reusing the fourth image
      },
    ],
  },

  {
    title: "Main Courses",
    data: [
      {
        id: 5,
        name: "Spaghetti Bolognese",
        info: "Classic Italian pasta dish",
        price: 12.99,
        img: require("../../assets/image3.jpeg"),
      },
      {
        id: 6,
        name: "Grilled Salmon",
        info: "Freshly grilled salmon fillet",
        price: 15.99,
        img: require("../../assets/image4.jpeg"),
      },
      // Add more main course items here if needed
      {
        id: 7,
        name: "Chicken Parmesan",
        info: "Breaded chicken topped with marinara sauce and melted cheese",
        price: 14.99,
        img: require("../../assets/image1.png"), // Reusing the first image
      },
      {
        id: 8,
        name: "Vegetable Stir Fry",
        info: "Assorted vegetables stir-fried in a savory sauce",
        price: 11.99,
        img: require("../../assets/image2.jpeg"), // Reusing the second image
      },
    ],
  },
  // Add more sections if needed
  {
    title: "Desserts",
    data: [
      {
        id: 9,
        name: "Chocolate Cake",
        info: "Rich chocolate cake with icing",
        price: 7.99,
        img: require("../../assets/image1.png"),
      },
      {
        id: 10,
        name: "Tiramisu",
        info: "Classic Italian dessert with coffee flavor",
        price: 9.99,
        img: require("../../assets/image2.jpeg"),
      },
      // Add more dessert items here if needed
      {
        id: 11,
        name: "Cheesecake",
        info: "Creamy cheesecake with a graham cracker crust",
        price: 8.99,
        img: require("../../assets/image3.jpeg"), // Reusing the third image
      },
      {
        id: 12,
        name: "Fruit Salad",
        info: "Fresh fruit salad with honey-lime dressing",
        price: 6.99,
        img: require("../../assets/image4.jpeg"), // Reusing the fourth image
      },
    ],
  },
];

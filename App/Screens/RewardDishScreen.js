import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Screen from "../Components/Screen";
import colors from "../styles/colors";
import { pointItemAdded } from "../context/basket";

export default function RewardDichScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const item = route.params.item;

  const addProductToBasket = (product, quantity = 1, points) => {
    dispatch(pointItemAdded({ product, quantity, points: points * quantity }));
  };

  const [quantity, setQuantity] = useState(1);
  const addToCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addProductToBasket(item.product, quantity, item.requiredPoints);
    navigation.goBack();
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (item.requiredPoints * quantity).toFixed(0);

  return (
    <Screen style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
      <View style={styles.container}>
        <Animated.Image
          entering={FadeIn.duration(400).delay(250)}
          source={item?.product.img}
          style={styles.image}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(250)}
            style={styles.dishName}
          >
            {item?.product.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(450)}
            style={styles.dishInfo}
          >
            {item?.product.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={decrementQuantity}
            >
              <MaterialIcons
                name="remove-circle-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={incrementQuantity}
            >
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
            <Text style={styles.footerText}>Add for {totalPrice} pt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dishInfo: {
    fontSize: 16,
    color: colors.mediumDark,
  },
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 200,
  },
  fullButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 80,
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 28,
    marginHorizontal: 20,
  },
});

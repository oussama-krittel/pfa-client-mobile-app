import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ConfettiCannon from "react-native-confetti-cannon";

import store from "../context/store";
import { basketCleared, reduceProduct } from "../context/basket";
import AppText from "../Components/AppText";
import SwipeableRow from "../Components/SwipeableRow";
import colors from "../styles/colors";
import Screen from "./../Components/Screen";

function BasketScreen({ navigation }) {
  const dispatch = useDispatch();
  const { products, totalPrice, selectedItemsCount } = useSelector(
    (state) => state.basket
  );

  store.subscribe(() => {
    console.log("store changed in basketScreen");
  });

  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true);
    dispatch(basketCleared());
  };

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}
      {order && (
        <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Thank you for your order!
          </Text>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>New order</Text>
          </TouchableOpacity>
        </View>
      )}
      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: colors.light }} />
            )}
            renderItem={({ item }) =>
              item.quantity > 0 ? ( // Render SwipeableRow only if quantity is greater than 0
                <SwipeableRow onDelete={() => dispatch(reduceProduct(item))}>
                  <View style={styles.row}>
                    <AppText style={{ color: colors.secondary, fontSize: 18 }}>
                      {item.quantity}x
                    </AppText>
                    <AppText style={{ flex: 1, fontSize: 18 }}>
                      {item.name}
                    </AppText>
                    <AppText style={{ fontSize: 18 }}>
                      ${item.price * item.quantity}
                    </AppText>
                  </View>
                </SwipeableRow>
              ) : null
            }
            ListFooterComponent={
              <View>
                <View
                  style={{ height: 1, backgroundColor: colors.medium }}
                ></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>${totalPrice}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.service}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Order Total</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    ${(totalPrice + FEES.service + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
          />

          <View style={styles.footer}>
            <Screen style={{ backgroundColor: "#fff" }}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}
              >
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </Screen>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: colors.medium,
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
  },
  fullButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 50,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderBtn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default BasketScreen;

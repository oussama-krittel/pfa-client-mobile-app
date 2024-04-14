import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ConfettiCannon from "react-native-confetti-cannon";
import QRCode from "react-native-qrcode-svg";

import store from "../context/store";
import { basketCleared, reduceProduct } from "../context/basket";
import AppText from "../Components/AppText";
import SwipeableRow from "../Components/SwipeableRow";
import colors from "../styles/colors";
import Screen from "./../Components/Screen";
import { reducePointProduct } from "../context/basket";
import OrderConfirmedScreen from "./OrderConfirmedScreen";

const windowWidth = Dimensions.get("window").width;

function BasketScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    products,
    pointsProducts,
    totalPrice,
    totalBonusPoints,
    selectedItemsCount,
    totalPoints,
  } = useSelector((state) => state.basket);

  store.subscribe(() => {
    console.log("store changed in basketScreen");
  });

  useEffect(() => {
    console.log(totalBonusPoints);
    console.log(pointsProducts);
  }, []);

  const [bonus, setBonus] = useState(totalBonusPoints);

  const [order, setOrder] = useState(false);
  const [preOrder, setPreOrder] = useState(false);

  const startCheckout = () => {
    setPreOrder(false);
    setOrder(true);
    dispatch(basketCleared());
  };

  const readyToCheckOut = () => {
    setPreOrder(true);
  };

  const formatPrice = (price) => {
    return Math.max(0, parseFloat(price).toFixed(2));
  };

  return (
    <Screen>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}
      {order && <OrderConfirmedScreen navigation={navigation} bonus={bonus} />}

      {preOrder && (
        <View
          style={{
            marginTop: "15%",
            padding: 20,
            justifyContent: "space-around",
            alignItems: "center",
            flex: 1,
          }}
        >
          <QRCode value="http://awesome.link.qr" size={0.8 * windowWidth} />
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: colors.primary,
              margin: 15,
              borderRadius: 10,
            }}
            onPress={startCheckout}
          >
            <Text style={styles.footerText}>Order now</Text>
          </TouchableOpacity>
        </View>
      )}
      {!preOrder && !order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.section}> Items</Text>
                  <AppText style={{ marginRight: 10 }}>
                    {formatPrice(totalPrice)} $
                  </AppText>
                </View>
                {products.length === 0 ? (
                  <View style={styles.emptyView}>
                    <AppText style={styles.emptyText}>
                      No items in the basket
                    </AppText>
                  </View>
                ) : (
                  <AppText style={styles.section2}>
                    + Bonus Points: {totalBonusPoints} pt
                  </AppText>
                )}
              </>
            }
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: colors.light }} />
            )}
            renderItem={({ item }) =>
              item.quantity > 0 ? ( // Render SwipeableRow only if quantity is greater than 0
                <SwipeableRow
                  onDelete={() => {
                    dispatch(reduceProduct(item));
                    setBonus(bonus - item.bonusPoints);
                  }}
                >
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
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.section}>Rewards</Text>
                  <AppText style={{ marginRight: 10 }}>
                    {totalPoints} pt
                  </AppText>
                </View>

                {pointsProducts.length === 0 && (
                  <View style={styles.emptyView}>
                    <AppText style={styles.emptyText}>
                      No rewards in the basket
                    </AppText>
                  </View>
                )}
                <FlatList
                  data={pointsProducts}
                  renderItem={({ item }) => (
                    <SwipeableRow
                      onDelete={() => dispatch(reducePointProduct(item))}
                    >
                      <View style={styles.row}>
                        <AppText
                          style={{ color: colors.secondary, fontSize: 18 }}
                        >
                          {item.quantity}x
                        </AppText>
                        <AppText style={{ flex: 1, fontSize: 18 }}>
                          {item.name}
                        </AppText>
                      </View>
                    </SwipeableRow>
                  )}
                />
              </>
            }
          />

          <View style={styles.footer}>
            <Screen style={{ backgroundColor: "#fff" }}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={readyToCheckOut}
              >
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </Screen>
          </View>
        </>
      )}
    </Screen>
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
    color: colors.dark,
  },
  section2: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: colors.secondary,
  },
  emptyView: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.dark,
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

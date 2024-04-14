import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";

const OrderConfirmedScreen = ({ navigation, bonus }) => {
  const [count, setCount] = useState(0);

  let step = Math.max(1, Math.round(bonus / 25));

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < bonus) {
        if (count < bonus - step) setCount((prevCount) => prevCount + step);
        else {
          setCount((prevCount) => prevCount + 1);
        }
      } else {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <View
      style={{ marginTop: "50%", padding: 20, alignItems: "center", flex: 1 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Thank you for your order!
      </Text>
      <Text style={styles.countText}>+{count} pt</Text>
      <TouchableOpacity
        style={styles.orderBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.footerText}>New order </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfirmedScreen;

const styles = StyleSheet.create({
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 40,
  },
  countText: {
    color: colors.secondary,
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

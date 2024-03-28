import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, StyleSheet, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";

const SwipeableRow = ({ children, onDelete }) => {
  const swipeableRow = useRef(null);

  const renderRightActions = (_progress, dragX) => {
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </RectButton>
    );
  };

  const close = () => {
    swipeableRow.current?.close();
    onDelete();
  };

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default SwipeableRow;

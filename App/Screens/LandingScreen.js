import React, { useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "../Components/BottomSheetContent";
import LandingScreenHeader from "../Components/LandingScreenHeader";
import HorizontalScrollComponent from "../Components/HorizontalScrollComponent";

export default function LandingScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const data = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"];

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
      <LandingScreenHeader openBottomSheet={openBottomSheet} />
      <TouchableOpacity
        style={[
          styles.overlay,
          { display: bottomSheetVisible ? "flex" : "none" },
        ]}
        activeOpacity={1}
        onPress={closeBottomSheet}
      />
      <ScrollView style={{ flex: 1 }}>
        <HorizontalScrollComponent title="Most popular" cards={data} />
        <HorizontalScrollComponent title="Most ratings" cards={data} />
        <HorizontalScrollComponent title="Near you" cards={data} />
        <HorizontalScrollComponent title="recomendations" cards={data} />
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
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
  },
});

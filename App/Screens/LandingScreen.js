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
    { id: 1, img: require("../../assets/image1.png"), title: "Card 1" },
    { id: 2, img: require("../../assets/image2.jpeg"), title: "Card 2" },
    { id: 3, img: require("../../assets/image3.jpeg"), title: "Card 3" },
    { id: 4, img: require("../../assets/image4.jpeg"), title: "Card 4" },
    { id: 5, img: require("../../assets/images.jpeg"), title: "Card 5" },
  ];

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
  };

  // const [scrollDirection, setScrollDirection] = useState("down");
  // const [offset, setOffset] = useState(0);

  // const handleScroll = (event) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;
  //   const threshold = 30;
  //   const direction =
  //     currentOffset > offset + threshold
  //       ? "down"
  //       : currentOffset < offset - threshold
  //       ? "up"
  //       : scrollDirection;
  //   setScrollDirection(direction);
  //   setOffset(currentOffset);
  // };
  // useEffect(() => {
  //   console.log("Scroll direction:", scrollDirection);
  // }, [scrollDirection]);

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

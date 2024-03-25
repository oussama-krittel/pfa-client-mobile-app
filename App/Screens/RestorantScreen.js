import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ParallaxScrollView from "../Components/ParallaxScrollView";
import colors from "../styles/colors";
import AppText from "../Components/AppText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Menu from "../Components/Menu";

export default function RestorantScreen({ route }) {
  const opacity = useSharedValue(0);

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
        <View style={styles.detailsContainer}>
          <Menu />
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.light,
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
});

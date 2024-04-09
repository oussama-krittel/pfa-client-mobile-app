import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "../styles/colors";

function Step1() {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepText}>Step 1 Component Content</Text>
    </View>
  );
}

function Step2() {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepText}>Step 2 Component Content</Text>
    </View>
  );
}

function Step3() {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepText}>Step 3 Component Content</Text>
    </View>
  );
}

function Step4() {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepText}>Step 4 Component Content</Text>
    </View>
  );
}

function TutorialScreen(props) {
  const scrollViewRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    scrollToStep(currentStep);
  }, [currentStep]);

  const scrollToStep = (step) => {
    scrollViewRef.current.scrollTo({
      x: step * Dimensions.get("window").width,
      y: 0,
      animated: true,
    });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
      </ScrollView>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, currentStep === 0 && styles.disabled]}
          onPress={handlePrev}
          disabled={currentStep === 0}
        >
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          {[...Array(4)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, currentStep === index && styles.selectedDot]}
              onPress={() => setCurrentStep(index)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, currentStep === 3 && styles.disabled]}
          onPress={handleNext}
          disabled={currentStep === 3}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 20,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal:7,
  },
  buttonText: {
    fontSize: 32,
    color: colors.secondary,
  },
  disabled: {
    opacity: 0.3,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 13,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius:7,
    backgroundColor: colors.primary,
  },
});

export default TutorialScreen;

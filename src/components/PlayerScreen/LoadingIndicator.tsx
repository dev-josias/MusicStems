import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.white} />
    <Text style={styles.progressText}>Loading...</Text>
  </View>
);

export default LoadingIndicator;

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressText: {
    color: colors.white,
    marginLeft: 10,
  },
});

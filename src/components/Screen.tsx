import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "@/theme/colors";

const Screen = ({
  children,
  customStyles,
}: {
  children: ReactNode;
  customStyles?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[styles.container, customStyles]}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

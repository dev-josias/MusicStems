import { StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "@/theme/colors";

const Screen = ({
  children,
  customStyles,
}: {
  children: ReactNode;
  customStyles?: ViewStyle;
}) => {
  return <View style={[styles.container, customStyles]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

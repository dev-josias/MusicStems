import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";

const AppText = ({
  text,
  customStyles,
}: {
  text: string;
  customStyles?: TextStyle;
}) => <Text style={[styles.text, customStyles]}>{text}</Text>;

export default AppText;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontWeight: "bold",
  },
});

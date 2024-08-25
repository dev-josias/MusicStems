import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";

const Input = ({
  placeholder,
  customStyles,
  ...otherProps
}: TextInputProps & { customStyles?: TextInputProps["style"] }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.textInput, customStyles]}
      placeholderTextColor={colors.white}
      {...otherProps}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    alignSelf: "center",
    color: colors.primary,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
});

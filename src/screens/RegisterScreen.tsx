import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AppButton from "@/components/AppButton";
import { colors } from "@/theme/colors";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      setUser(user);
      await user.sendEmailVerification();

      Alert.alert(
        "Registration successful",
        "A verification email has been sent. Please check your inbox."
      );
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    }
  };

  const resendVerificationEmail = async () => {
    if (user) {
      try {
        await user.sendEmailVerification();
        Alert.alert(
          "Verification email sent",
          "Please check your inbox for the verification email."
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to send verification email. Please try again."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton
        title="Register"
        onPress={handleRegister}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      <AppButton
        title="Login"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={styles.loginButton}
      />
      {user && (
        <AppButton
          title="Resend Verification Email"
          onPress={resendVerificationEmail}
          buttonStyle={{ backgroundColor: colors.primary }}
          textStyle={{ color: colors.background }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
  },
  loginButton: {
    backgroundColor: "transparent",
  },
});

export default RegisterScreen;

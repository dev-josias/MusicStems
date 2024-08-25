import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AppButton from "@/components/AppButton";
import { colors } from "@/theme/colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          "Email not verified",
          "Please verify your email address to continue.",
          [
            {
              text: "Resend Verification Email",
              onPress: () => resendVerificationEmail(user),
            },
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        auth().signOut();
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  const resendVerificationEmail = async (user) => {
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
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      <AppButton
        title="Register"
        onPress={() => navigation.navigate("Register")}
        buttonStyle={styles.registerButton}
      />
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
  registerButton: {
    backgroundColor: "transparent",
  },
});

export default LoginScreen;

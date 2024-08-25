import { Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import AppText from "@/components/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          // This is the first launch
          await AsyncStorage.setItem("hasLaunched", "true");
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }, 2000);
        } else {
          // Not the first launch, navigate directly
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      } catch (error) {
        console.error("Error checking first launch", error);
      } finally {
        setLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (loading) {
    return null; // Optionally render a loading spinner or null
  }

  return (
    <Screen customStyles={styles.container}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <AppText text={"Welcome"} customStyles={styles.title} />
    </Screen>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  title: {
    fontSize: 40,
  },
});

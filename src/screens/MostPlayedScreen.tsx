import { View } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import AppHeader from "@/components/AppHeader";
import SongsList from "@/components/SongsList";
import { globalStyles } from "@/theme/globalStyles";
import { useAppSelector } from "@/app/hooks";

const MostPlayedScreen = () => {
  const mostPlayed = useAppSelector((state) => state.storage.mostPlayed);
  return (
    <Screen>
      <AppHeader title={"Most Played Songs"} searchIcon />
      <View style={globalStyles.container}>
        <SongsList songs={mostPlayed} />
      </View>
    </Screen>
  );
};

export default MostPlayedScreen;

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

type PlayerControlsProps = {
  shuffleMode: boolean;
  toggleShuffle: () => void;
  skipPrevious: () => void;
  togglePlay: () => void;
  skipNext: (callback: Function) => void;
  setStemUrls: (urls: null) => void;
  audioState: {
    state: string;
    isLooping: boolean;
  };
  toggleLoop: () => void;
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  shuffleMode,
  toggleShuffle,
  skipPrevious,
  togglePlay,
  skipNext,
  setStemUrls,
  audioState,
  toggleLoop,
}) => (
  <View style={styles.controls}>
    <TouchableOpacity onPress={toggleShuffle}>
      <MaterialCommunityIcons
        name="shuffle-variant"
        color={shuffleMode ? colors.white : colors.light}
        size={30}
      />
    </TouchableOpacity>
    <View style={styles.songControls}>
      <TouchableOpacity onPress={skipPrevious}>
        <MaterialCommunityIcons
          name="skip-previous"
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePlay}>
        <MaterialCommunityIcons
          name={audioState.state === "playing" ? "pause" : "play"}
          color={colors.white}
          size={50}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          skipNext(() => {
            setStemUrls(null);
          })
        }
      >
        <MaterialCommunityIcons
          name="skip-next"
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={toggleLoop}>
      <MaterialIcons
        name={audioState.isLooping ? "sync" : "sync-alt"}
        color={colors.white}
        size={30}
      />
    </TouchableOpacity>
  </View>
);

export default PlayerControls;

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 30,
  },
  songControls: {
    flexDirection: "row",
    alignItems: "center",
  },
});

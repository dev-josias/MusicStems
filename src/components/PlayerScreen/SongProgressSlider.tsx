import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import AppText from "@/components/AppText";
import { convertTime } from "@/helpers/convertTime";
import { colors } from "@/theme/colors";

type SongProgressSliderProps = {
  position: number;
  duration: number;
  onSeek: (value: number) => void;
};

const SongProgressSlider: React.FC<SongProgressSliderProps> = ({
  position,
  duration,
  onSeek,
}) => (
  <View style={styles.songProgress}>
    <Slider
      value={position}
      minimumValue={0}
      maximumValue={duration}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      thumbTintColor={colors.white}
      onSlidingComplete={onSeek}
    />
    <View style={styles.durations}>
      <AppText
        text={(position < 60 ? "00:" : "") + convertTime(position)}
        customStyles={{ color: colors.white }}
      />
      <AppText
        text={convertTime(duration)}
        customStyles={{ color: colors.white }}
      />
    </View>
  </View>
);

export default SongProgressSlider;

const styles = StyleSheet.create({
  songProgress: {
    paddingHorizontal: 20,
  },
  durations: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

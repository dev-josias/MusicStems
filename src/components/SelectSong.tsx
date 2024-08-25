import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AppText from "./AppText";
import { colors } from "@/theme/colors";
import ArtworkImage from "./ArtworkImage";
import { convertTime } from "@/helpers/convertTime";
import { truncate } from "@/helpers/truncate";
import { SongType } from "@/types";

type SelecSongProps = SongType & {
  onSelect: (song: SongType) => void;
};

const SelectSong = ({
  id,
  title,
  uri,
  artist,
  duration,
  artwork,
  onSelect,
}: SelecSongProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectSong = () => {
    setIsSelected((currentValue) => !currentValue);
    onSelect({ id, title, uri, artist, duration, artwork });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSelected ? colors.secondary : colors.primary },
      ]}
      onPress={selectSong}
    >
      <View style={styles.songMainDetails}>
        <ArtworkImage artwork={artwork} styles={styles.image} />
        <View style={styles.songInfo}>
          <AppText
            text={truncate(title)}
            customStyles={{ color: isSelected ? colors.primary : colors.white }}
          />
          <AppText
            text={artist}
            customStyles={{ color: isSelected ? colors.primary : colors.white }}
          />
        </View>
      </View>
      <View>
        <AppText
          text={convertTime(duration)}
          customStyles={{ color: isSelected ? colors.primary : colors.white }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectSong;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songMainDetails: {
    flexDirection: "row",
  },
  songInfo: {
    marginLeft: 10,
  },
  text: {
    color: colors.white,
  },
});

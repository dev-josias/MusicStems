import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { BASE_API_URL } from "@/data/constants";
import * as FileSystem from "expo-file-system";
import auth from "@react-native-firebase/auth";
import notifee, { AndroidImportance } from "@notifee/react-native";

const formatTime = (millis: number): string => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

type StemControlsProps = {
  stemUrls: {
    vocals: string;
    drums: string;
    bass: string;
    other: string;
  };
  onClose: () => void;
};

const StemControls: React.FC<StemControlsProps> = ({ stemUrls, onClose }) => {
  const [volumes, setVolumes] = useState({
    vocals: 1,
    drums: 1,
    bass: 1,
    other: 1,
  });

  const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const sounds = await Promise.all(
          Object.values(stemUrls).map(async (url, index) => {
            const { sound } = await Audio.Sound.createAsync(
              {
                uri: `${BASE_API_URL}/${url}`,
                headers: {
                  Authorization: await auth().currentUser.getIdToken(),
                },
              },
              {
                volume:
                  volumes[Object.keys(stemUrls)[index] as keyof typeof volumes],
                shouldPlay: false,
                isLooping: true, // Loop the sound for continuous playback
              }
            );

            // Set the initial duration
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              setDuration(status.durationMillis || 0);
            }

            // Update the position as the sound plays
            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.positionMillis != null) {
                setPosition(status.positionMillis);
              }
            });

            return sound;
          })
        );
        setSoundObjects(sounds);
      } catch (error) {
        Alert.alert("Error", "Failed to load stems");
      }
    };

    loadSounds();

    return () => {
      soundObjects.forEach((sound) => sound.unloadAsync());
    };
  }, [stemUrls]);

  const adjustVolume = async (stem: keyof typeof volumes, value: number) => {
    setVolumes((prev) => ({ ...prev, [stem]: value }));
    const index = Object.keys(stemUrls).indexOf(stem);
    if (soundObjects[index]) {
      await soundObjects[index].setVolumeAsync(value);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      // Pause all stems
      await Promise.all(soundObjects.map((sound) => sound.pauseAsync()));
    } else {
      await Promise.all(soundObjects.map((sound) => sound.playAsync()));
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = async () => {
    await Promise.all(soundObjects.map((sound) => sound.stopAsync()));
    await Promise.all(soundObjects.map((sound) => sound.unloadAsync()));
    onClose();
  };

  return (
    <Modal visible transparent>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <MaterialCommunityIcons
            name="close-circle"
            size={32}
            color={colors.white}
          />
        </TouchableOpacity>
        {Object.keys(stemUrls).map((stem) => (
          <View key={stem} style={styles.stemControl}>
            <Text style={styles.label}>{stem.toUpperCase()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={volumes[stem as keyof typeof volumes]}
              minimumTrackTintColor={colors.white}
              maximumTrackTintColor={colors.light}
              thumbTintColor={colors.white}
              onValueChange={(value) =>
                adjustVolume(stem as keyof typeof volumes, value)
              }
            />
          </View>
        ))}
        <Slider
          style={styles.progressSlider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.light}
          thumbTintColor={colors.white}
          onValueChange={async (value) => {
            soundObjects.forEach(async (sound) => {
              await sound.setPositionAsync(value);
            });
            setPosition(value);
          }}
        />

        <Text style={styles.timeDisplay}>
          {formatTime(position)} / {formatTime(duration)}
        </Text>

        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <MaterialCommunityIcons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default StemControls;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  downloadText: {
    color: colors.white,
    fontWeight: "bold",
  },
  playButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  stemControl: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
  },
  progressSlider: {
    width: "100%",
    marginVertical: 20,
  },
  timeDisplay: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

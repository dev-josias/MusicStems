import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "@/components/Screen";
import AppHeader from "@/components/AppHeader";
import { colors } from "@/theme/colors";
import AppText from "@/components/AppText";
import ArtworkImage from "@/components/ArtworkImage";
import { truncate } from "@/helpers/truncate";
import {
  setFavorites,
  setMostPlayed,
  setRecentlyPlayed,
} from "@/features/storage/storageSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import StemControls from "@/components/StemControls";
import { BASE_API_URL } from "@/data/constants";
import RNBlobUtil from "react-native-blob-util";
import TaskProgress from "@/components/TaskProgress";
import { setShuffleMode } from "@/features/queue/queueSlice";
import StemActions from "@/components/PlayerScreen/StemActions";
import LoadingIndicator from "@/components/PlayerScreen/LoadingIndicator";
import PlayerControls from "@/components/PlayerScreen/PlayerControls";
import SongProgressSlider from "@/components/PlayerScreen/SongProgressSlider";
import { setCurrentTasks } from "@/features/tasks/tasksSlices";

const PlayerScreen = ({ route }) => {
  const { id, uri, artwork, artist, title, duration } = route.params;

  const [stems, setStems] = useState(4);
  const [stemUrls, setStemUrls] = useState(null);
  const [fileHash, setFileHash] = useState(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskError, setTaskError] = useState("");

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const queue = useAppSelector((state) => state.queue.queue);
  const shuffleMode = useAppSelector((state) => state.queue.shuffleMode);
  const audioState = useAppSelector((state) => state.queue.audioState);
  const sound = useAppSelector((state) => state.queue.sound);
  const favorites = useAppSelector((state) => state.storage.favorites);
  const recentlyPlayed = useAppSelector(
    (state) => state.storage.recentlyPlayed
  );
  const mostPlayed = useAppSelector((state) => state.storage.mostPlayed);

  const currentTasks = useAppSelector((state) => state.tasks.currentTasks);

  const { currentSong, setCurrentSong, togglePlay, skipNext } = useAudioPlayer({
    id,
    uri,
    artwork,
    artist,
    title,
    duration,
  });

  useEffect(() => {
    updateMostPlayed();
    updateRecentlyPlayed();
    checkIfAudioWasAlreadyProcessed();
    checkIfAudioIsProcessing();
  }, [currentSong]);

  const checkIfAudioIsProcessing = () => {
    const currentTaskIndex = currentTasks.findIndex(
      (task) => task.audioId === currentSong.id
    );
    if (currentTaskIndex !== -1) {
      setTaskId(currentTasks[currentTaskIndex].taskId);
      setProcessing(true);
    }
  };

  const updateRecentlyPlayed = useCallback(() => {
    const updatedRecentlyPlayed = [
      currentSong,
      ...recentlyPlayed.filter((asset) => asset.id !== currentSong.id),
    ];
    dispatch(setRecentlyPlayed(updatedRecentlyPlayed));
  }, [currentSong, dispatch, recentlyPlayed]);

  const updateMostPlayed = useCallback(() => {
    const updatedMostPlayed = [...mostPlayed];
    const songIndex = updatedMostPlayed.findIndex(
      (asset) => asset.id === currentSong.id
    );
    if (songIndex !== -1) {
      updatedMostPlayed[songIndex].count++;
    } else {
      updatedMostPlayed.push({ ...currentSong, count: 1 });
    }
    updatedMostPlayed.sort((a, b) => b.count - a.count);
    dispatch(setMostPlayed(updatedMostPlayed));
  }, [currentSong, dispatch, mostPlayed]);

  const seek = async (value: number) => {
    await sound.setPositionAsync(value * 1000);
  };

  const findCurrentSongIndex = () =>
    queue.findIndex((track) => track.id === currentSong.id);

  const skipPrevious = async () => {
    setStemUrls(null);
    const index = findCurrentSongIndex();
    const prevSong = index === 0 ? queue[queue.length - 1] : queue[index - 1];
    setCurrentSong(prevSong);
  };

  const toggleLoop = async () => {
    await sound.setIsLoopingAsync(!audioState.isLooping);
  };

  const toggleShuffle = () => {
    dispatch(setShuffleMode(!shuffleMode));
  };

  const toggleFavorites = () => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex(
      (favorite) => favorite.id === currentSong.id
    );
    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.unshift(currentSong);
      dispatch(setFavorites(updatedFavorites));
    }
  };

  const checkIfAudioWasAlreadyProcessed = async () => {
    setLoading(true);
    try {
      const response = await RNBlobUtil.fetch(
        "POST",
        `${BASE_API_URL}/file-hash`,
        {
          Authorization: `${await auth().currentUser.getIdToken()}`,
          "Content-Type": "multipart/form-data",
        },
        [
          {
            name: "file",
            filename: `${currentSong.title}.mp3`,
            data: RNBlobUtil.wrap(currentSong.uri),
          },
        ]
      );

      const responseData = JSON.parse(response.data);

      if (responseData.file_hash) {
        setFileHash(responseData.file_hash);
        const doc = await firestore()
          .collection("processed_files")
          .doc(auth().currentUser.uid)
          .collection("files")
          .doc(responseData.file_hash)
          .get();

        if (doc.exists) {
          setStemUrls(doc.data().stems_urls);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const extractStems = async () => {
    if (!auth().currentUser) {
      navigation.navigate("Login");
      return;
    }
    if (taskError) {
      setTaskError("");
    }
    setLoading(true);
    try {
      const response = await RNBlobUtil.fetch(
        "POST",
        `${BASE_API_URL}/extract`,
        {
          Authorization: `${await auth().currentUser.getIdToken()}`,
          "Content-Type": "multipart/form-data",
        },
        [
          {
            name: "file",
            filename: `${currentSong.title}.mp3`,
            data: RNBlobUtil.wrap(currentSong.uri),
          },
          { name: "stems", data: stems.toString() },
        ]
      );

      const responseData = JSON.parse(response.data);
      if (responseData.message === "File already processed") {
        setStemUrls(responseData.stems_urls);
        setModalVisible(true);
        setProcessing(false);
      } else if (responseData.task_id) {
        setProcessing(true);
        setTaskId(responseData.task_id);
        dispatch(
          setCurrentTasks([
            ...currentTasks,
            { taskId: responseData.task_id, audioId: currentSong.id },
          ])
        );
      } else if (responseData.error) {
        Alert.alert("Error", responseData.error);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      setTaskError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = (taskId: string) => {
    dispatch(
      setCurrentTasks(currentTasks.filter((task) => task.taskId !== taskId))
    );
  };

  return (
    <Screen>
      <AppHeader title={truncate(currentSong.title, 20)} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <ArtworkImage artwork={currentSong.artwork} styles={styles.image} />
        </View>
        <View style={styles.songInfo}>
          <View style={styles.songDetails}>
            <TouchableOpacity onPress={toggleFavorites}>
              <MaterialCommunityIcons
                name="heart"
                color={
                  favorites.some((favorite) => favorite.id === currentSong.id)
                    ? colors.danger
                    : colors.white
                }
                size={40}
              />
            </TouchableOpacity>
            <View style={styles.songTitleAndArtist}>
              <AppText
                text={truncate(currentSong.title, 20)}
                customStyles={styles.songTitle}
              />
              <AppText
                text={currentSong.artist}
                customStyles={styles.songArtist}
              />
            </View>
          </View>
        </View>
        <SongProgressSlider
          position={audioState.position}
          duration={currentSong.duration}
          onSeek={seek}
        />
        <PlayerControls
          shuffleMode={shuffleMode}
          toggleShuffle={toggleShuffle}
          skipPrevious={skipPrevious}
          togglePlay={togglePlay}
          skipNext={skipNext}
          setStemUrls={setStemUrls}
          audioState={audioState}
          toggleLoop={toggleLoop}
        />
        {loading && !taskId && <LoadingIndicator />}
        {processing && taskId ? (
          <TaskProgress
            taskId={taskId}
            onComplete={(result) => {
              setStemUrls(result);
              setProcessing(false);
              removeTask(taskId);
              setTaskId(null);
            }}
            onError={(message: string) => {
              setProcessing(false);
              removeTask(taskId);
              setTaskId(null);
              setTaskError(message);
            }}
          />
        ) : (
          !loading && (
            <StemActions
              stemUrls={stemUrls}
              onPlay={() => {
                sound.pauseAsync();
                setModalVisible(true);
              }}
              onNewExtraction={() => setStemUrls(null)}
              onExtractStems={extractStems}
            />
          )
        )}
        {taskError && <Text style={styles.error}>{taskError}</Text>}
        {modalVisible && stemUrls && (
          <StemControls
            stemUrls={stemUrls}
            onClose={() => setModalVisible(false)}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  imageContainer: {},
  image: {
    width: "80%",
    height: 300,
    alignSelf: "center",
    borderRadius: 20,
  },
  songInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  songDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  songTitleAndArtist: {
    marginLeft: 10,
  },
  songArtist: {
    fontWeight: "normal",
    color: colors.white,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "normal",
    color: colors.white,
  },
  error: {
    color: colors.danger,
    textAlign: "center",
    marginVertical: 10,
  },
});

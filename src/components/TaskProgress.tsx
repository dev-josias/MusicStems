import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress"; // Adjust the import path accordingly
import useTaskStatus from "../hooks/useTaskStatus";
import { colors } from "@/theme/colors";

interface TaskProgressProps {
  taskId: string;
  onComplete: (result: any) => void;
}

const TaskProgress: React.FC<TaskProgressProps> = ({ taskId, onComplete }) => {
  const { status, progress, result } = useTaskStatus(taskId);

  useEffect(() => {
    if (result) {
      onComplete(result);
    }
  }, [result]);

  return (
    <View style={styles.container}>
      {!result && (
        <CircularProgress progress={progress} size={120} color={"#FF5733"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default TaskProgress;

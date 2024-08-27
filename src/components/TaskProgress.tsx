import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress"; // Adjust the import path accordingly
import useTaskStatus from "../hooks/useTaskStatus";
import { colors } from "@/theme/colors";

interface TaskProgressProps {
  taskId: string;
  onComplete: (result: any) => void;
  onError: (message: string) => void;
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  taskId,
  onComplete,
  onError,
}) => {
  const { status, progress, result } = useTaskStatus(taskId);

  useEffect(() => {
    if (result && status === "SUCCESS") {
      onComplete(result);
    } else if (status === "FAILURE") {
      onError(result || "Something went wrong occured. Please try again");
    }
  }, [result, status]);
  return (
    <View style={styles.container}>
      {!result && (
        <>
          <Text style={styles.title}>Extracting tracks</Text>
          <CircularProgress progress={progress} size={120} color={"#FF5733"} />
        </>
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
  title: {
    color: colors.white,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default TaskProgress;

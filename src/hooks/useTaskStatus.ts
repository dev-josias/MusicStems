import { BASE_API_URL } from "@/data/constants";
import auth from "@react-native-firebase/auth";
import { useState, useEffect } from "react";

type TaskState = "PENDING" | "STARTED" | "SUCCESS" | "FAILURE" | "PROGRESS";

interface TaskStatusResponse {
  state: TaskState;
  progress: number;
  result?: any; // Adjust the type based on your actual result type
}

const useTaskStatus = (taskId: string) => {
  const [status, setStatus] = useState<TaskState>("PENDING");
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<any>(null); // Add a state for the task result

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/task-status/${taskId}`, {
          method: "GET",
          headers: {
            Authorization: `${await auth().currentUser.getIdToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: TaskStatusResponse = await response.json();
        setStatus(data.state);
        setProgress(data.progress);

        if (data.state === "SUCCESS" || data.state === "FAILURE") {
          setResult(data.result); // Set the result when the task is complete
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching task status:", error);
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [taskId]);

  return { status, progress, result }; // Return the result along with status and progress
};

export default useTaskStatus;

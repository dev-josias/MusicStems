import { Task, TasksStateType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksStateType = {
  currentTasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTasks: (state, action: PayloadAction<Task[]>) => {
      state.currentTasks = action.payload;
    },
  },
});

export const { setCurrentTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

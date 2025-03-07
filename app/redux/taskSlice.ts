import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  condition: string;
}

interface TaskState {
  selectedTask: Task | null;
}

const initialState: TaskState = {
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RacePosition } from "../../types/types";

interface userInterface {
  amount: number;
  lastMintTimeStamp: Date | null;
  lastRacePosition: RacePosition;
  lastRaceTimeStamp: Date | null;
}
const initialState: userInterface = {
  amount: 0,
  lastMintTimeStamp: null,
  lastRacePosition: "none",
  lastRaceTimeStamp: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userInterface>) => {
      const { amount, lastMintTimeStamp, lastRacePosition, lastRaceTimeStamp } =
        action.payload;
      state.amount = amount;
      state.lastMintTimeStamp = lastMintTimeStamp;
      state.lastRacePosition = lastRacePosition;
      state.lastRaceTimeStamp = lastRaceTimeStamp;
    },
    resetUser: (state) => {
      state.amount = 0;
      state.lastMintTimeStamp = null;
      state.lastRacePosition = "none";
      state.lastRaceTimeStamp = null;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

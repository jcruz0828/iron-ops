// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeightEntry {
  value: number;
  date: string; // ISO string
}

interface UserState {
  name: string;
  sex: 'M' | 'F' | '';
  birthDate: string | null;
  weight: WeightEntry[];
  fitnessGoals: string[];
}

const initialState: UserState = {
  name: '',
  sex: '',
  birthDate: null,
  weight: [],
  fitnessGoals: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSex(state, action: PayloadAction<'M' | 'F'>) {
      state.sex = action.payload;
    },
    setBirthDate(state, action: PayloadAction<string>) {
      state.birthDate = action.payload;
    },
    setWeight(state, action: PayloadAction<WeightEntry[]>) {
      state.weight = action.payload;
    },
    addWeightEntry(state, action: PayloadAction<WeightEntry>) {
      state.weight.push(action.payload);
    },
    setFitnessGoals(state, action: PayloadAction<string[]>) {
      state.fitnessGoals = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {
  setName,
  setSex,
  setBirthDate,
  setWeight,
  addWeightEntry,
  setFitnessGoals,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;

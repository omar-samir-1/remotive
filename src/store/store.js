import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// action creator
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const response = await fetch(`../fullJobs.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
});

// create a slice of the store (reducer)
const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// create a slice of the store (reducer)
export const namingSlice = createSlice({
  name: "naming",
  initialState: { firstName: "ahmed", secondName: "mohamed" },
  reducers: {
    changeSecond(curState, action) {
      curState.secondName = action.payload;
    },
    changeFirst(curState, action) {
      curState.firstName = action.payload;
    },
  },
});

// create a slice of the store (reducer)
export const selectedIndustrySlice = createSlice({
  name: "selectedIndustry",
  initialState: [],
  reducers: {
    addSelectedIndustry(curState, action) {
      if (curState.some((v) => v === action.payload))
        curState.splice(curState.indexOf(action.payload), 1);
      else curState.push(action.payload);
    },
  },
});

// create a slice of the store (reducer)
export const selectedCountrySlice = createSlice({
  name: "selectedCountry",
  initialState: [],
  reducers: {
    addSelectedCountry(curState, action) {
      if (curState.some((v) => v === action.payload))
        curState.splice(curState.indexOf(action.payload), 1);
      else curState.push(action.payload);
    },
  },
});

// creating the store
export const store = configureStore({
  reducer: {
    naming: namingSlice.reducer,
    jobs: jobsSlice.reducer,
    selectedIndustry: selectedIndustrySlice.reducer,
    selectedCountry: selectedCountrySlice.reducer,
  },
});

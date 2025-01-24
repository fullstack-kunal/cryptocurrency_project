import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCrypto: "bitcoin",
  currentPrice: null,
  historicalData: [],
  overviewData: {},
  volumeData: {},
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setCurrentPrice: (state, action) => {
      state.currentPrice = action.payload;
    },
    setHistoricalData: (state, action) => {
      state.historicalData = action.payload;
    },
    setOverviewData: (state, action) => {
      state.overviewData = action.payload;
    },
    setHistoricalVolume(state, action) {
      state.volumeData = action.payload;
    }
  },
});

export const {
  setSelectedCrypto,
  setCurrentPrice,
  setHistoricalData,
  setOverviewData,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

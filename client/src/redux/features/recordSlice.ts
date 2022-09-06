import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IListRecords } from "../../models/Record";
import * as api from "../api";
import { RootState } from "../store";

export interface IStoreListRecords {
  statusRecords: {
    listRecords: IListRecords;
    error: unknown;
    loading: boolean;
  };
}

const initialState: IStoreListRecords = {
  statusRecords: localStorage.getItem("listRecords")
    ? JSON.parse(localStorage.getItem("listRecords") || "{}")
    : {
        listRecords: [],
        error: "",
        loading: false,
      },
};

export const getRecords = createAsyncThunk(
  "record/getRecords",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.allRecords(token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const recordSlice = createSlice({
  name: "tableRecords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecords.pending, (state, { payload }) => {
      state.statusRecords.loading = true;
    });
    builder.addCase(getRecords.fulfilled, (state, { payload }) => {
      state.statusRecords.loading = false;
      state.statusRecords.listRecords = payload;
    });
    builder.addCase(getRecords.rejected, (state, { payload }) => {
      state.statusRecords.loading = false;
      state.statusRecords.error = payload;
    });
  },
});

export const dataRecords = (state: RootState) => state.records;

export default recordSlice.reducer;

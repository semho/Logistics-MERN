import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IListRecords, IRecord } from "../../models/Record";
import * as api from "../api";
import { RootState } from "../store";

export interface IStoreListRecords {
  statusRecords: {
    listRecords: IListRecords;
    error: unknown;
    loading: boolean;
  };
}

interface IApiEmptyRecord {
  newRecord: {};
  token: string;
  toast: typeof toast;
}

interface IApiRecord {
  record: IRecord;
  token: string;
  toast: typeof toast;
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

export const deleteRecord = createAsyncThunk(
  "record/deleteRecord",
  async (dataRecord: IApiRecord, { rejectWithValue, dispatch }) => {
    try {
      const { record, token, toast } = dataRecord;
      const response = await api.deleteRecord(record, token);
      if (!response) {
        throw new Error("Ошибка удаления запеси из таблицы");
      }
      if (!!response) {
        toast.success("Запись удалена");
      }
      dispatch(removeRecord(record));
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const createRecord = createAsyncThunk(
  "record/createRecord",
  async (dataRecord: IApiEmptyRecord, { rejectWithValue, dispatch }) => {
    try {
      const { newRecord, token, toast } = dataRecord;
      const response = await api.newRecord(newRecord, token);
      if (!response) {
        throw new Error("Ошибка добавления запеси в таблицу");
      }
      if (!!response) {
        toast.success("Запись добавлена");
      }
      dispatch(addNewRecord(response.data.answerRecord));
      // return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getRecords = createAsyncThunk(
  "record/getRecords",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.allRecords(token);
      if (!response) {
        throw new Error("Ошибка загрузки запесей в таблицу");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const setError = (state: IStoreListRecords, { payload }: any) => {
  state.statusRecords.loading = false;
  state.statusRecords.error = payload;
};

const recordSlice = createSlice({
  name: "tableRecords",
  initialState,
  reducers: {
    removeRecord: (state, action: PayloadAction<IRecord>) => {
      state.statusRecords.listRecords = state.statusRecords.listRecords.filter(
        (record) => record._id !== action.payload._id
      );
    },
    addNewRecord: (state, action: PayloadAction<IRecord>) => {
      state.statusRecords.listRecords.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecords.pending, (state, { payload }) => {
      state.statusRecords.loading = true;
      state.statusRecords.error = "";
    });
    builder.addCase(getRecords.fulfilled, (state, { payload }) => {
      state.statusRecords.loading = false;
      state.statusRecords.listRecords = payload;
    });
    builder.addCase(getRecords.rejected, setError);
    builder.addCase(deleteRecord.rejected, setError);
    builder.addCase(createRecord.rejected, setError);
  },
});

const { removeRecord, addNewRecord } = recordSlice.actions;

export const dataRecords = (state: RootState) => state.records;

export default recordSlice.reducer;

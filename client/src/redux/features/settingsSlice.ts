import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISettingsDestination,
  ISettingsDestinationShort,
  ISettingsForwarder,
  ISettingsProduct,
} from "../../models/Settings";
import { RootState } from "../store";
import * as api from "../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ISettings {
  settingsDestination: ISettingsDestination[];
  settingsProduct: ISettingsProduct[];
  settingsForwarder: ISettingsForwarder[];
}

export interface IStoreSettings {
  statusSettings: {
    allSettings: ISettings;
    error: unknown;
    loading: boolean;
  };
}

const initialState: IStoreSettings = {
  statusSettings: localStorage.getItem("allSettings")
    ? JSON.parse(localStorage.getItem("allSettings") || "{}")
    : {
        allSettings: {
          settingsDestination: [],
          settingsProduct: [],
          settingsForwarder: [],
        },
        error: "",
        loading: false,
      },
};

interface IApiRecord {
  record: ISettingsDestination;
}

interface IApiCreateRecord {
  newRecord: ISettingsDestinationShort;
}

export const updateDestination = createAsyncThunk(
  "settingsDestination/updateDestination",
  async (dataRecord: IApiRecord, { rejectWithValue, dispatch, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { record } = dataRecord;
      const response = await api.updateDestination(record, token);
      if (!!response) {
        dispatch(editDestination(record));
        toast.success("Запись изменена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const deleteDestination = createAsyncThunk(
  "settingsDestination/deleteDestination",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const response = await api.deleteDestination(id, token);
      if (!!response) {
        dispatch(removeDestination(id));
        toast.success("Запись удалена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const createDestination = createAsyncThunk(
  "settingsDestination/createDestination",
  async (
    dataRecord: IApiCreateRecord,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { newRecord } = dataRecord;
      const response = await api.newDestination(newRecord, token);
      if (!!response) {
        dispatch(newDestination(response.data.answerRecord));
        toast.success("Запись добавлена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getDestinations = createAsyncThunk(
  "settingsDestination/getDestinations",
  async (_, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;
      const response = await api.allDestinations(token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const setError = (state: IStoreSettings, { payload }: any) => {
  state.statusSettings.loading = false;
  state.statusSettings.error = payload;
};

const setLoader = (state: IStoreSettings) => {
  state.statusSettings.loading = true;
};

const deleteLoader = (state: IStoreSettings) => {
  state.statusSettings.loading = false;
};

const settingsSlice = createSlice({
  name: "tablesSettings",
  initialState,
  reducers: {
    newDestination: (state, action: PayloadAction<ISettingsDestination>) => {
      state.statusSettings.allSettings.settingsDestination.push(action.payload);
    },
    removeDestination: (state, action: PayloadAction<string>) => {
      state.statusSettings.allSettings.settingsDestination =
        state.statusSettings.allSettings.settingsDestination.filter(
          (record) => record._id !== action.payload
        );
    },
    editDestination: (state, action: PayloadAction<ISettingsDestination>) => {
      state.statusSettings.allSettings.settingsDestination =
        state.statusSettings.allSettings.settingsDestination.map((record) => {
          if (record._id === action.payload._id) {
            return {
              ...record,
              from: action.payload.from,
              to: action.payload.to,
              sender: action.payload.sender,
              recipient: action.payload.recipient,
              distance: action.payload.distance,
            };
          }
          return record;
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDestinations.pending, setLoader);
    builder.addCase(createDestination.pending, setLoader);
    builder.addCase(deleteDestination.pending, setLoader);

    builder.addCase(getDestinations.fulfilled, (state, { payload }) => {
      state.statusSettings.loading = false;
      state.statusSettings.allSettings.settingsDestination = payload;
    });
    builder.addCase(createDestination.fulfilled, deleteLoader);
    builder.addCase(deleteDestination.fulfilled, deleteLoader);

    builder.addCase(getDestinations.rejected, setError);
    builder.addCase(deleteDestination.rejected, setError);
    builder.addCase(createDestination.rejected, setError);
    builder.addCase(updateDestination.rejected, setError);
  },
});

const { newDestination, removeDestination, editDestination } =
  settingsSlice.actions;

export const dataSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;

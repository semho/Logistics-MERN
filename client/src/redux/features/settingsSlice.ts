import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISettingsDestination,
  ISettingsForwarder,
  ISettingsProduct,
} from "../../models/Settings";
import { RootState } from "../store";

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
  },
});

export const { newDestination, removeDestination } = settingsSlice.actions;

export const dataSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;

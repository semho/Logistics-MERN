import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISettingsDestination,
  ISettingsDestinationShort,
} from "../../models/settings/PointDestination";
import { RootState } from "../store";
import * as api from "../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  ISettingsProduct,
  ISettingsProductShort,
} from "../../models/settings/Product";
import {
  ISettingsForwarder,
  ISettingsForwarderShort,
} from "../../models/settings/Forwarder";
import {
  ISettingsOrganization,
  ISettingsOrganizationShort,
} from "../../models/settings/Organization";

interface ISettings {
  settingsOrganization: ISettingsOrganization[];
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
          settingsOrganization: [],
          settingsDestination: [],
          settingsProduct: [],
          settingsForwarder: [],
        },
        error: "",
        loading: false,
      },
};

interface IApiRecordOrganization {
  record: ISettingsOrganization;
}
interface IApiRecordDestination {
  record: ISettingsDestination;
}
interface IApiRecordProduct {
  record: ISettingsProduct;
}
interface IApiRecordForwarder {
  record: ISettingsForwarder;
}
interface IApiCreateRecordOrganization {
  newRecord: ISettingsOrganizationShort;
}
interface IApiCreateRecordDestination {
  newRecord: ISettingsDestinationShort;
}
interface IApiCreateRecordProduct {
  newRecord: ISettingsProductShort;
}
interface IApiCreateRecordForwarder {
  newRecord: ISettingsForwarderShort;
}

export const updateOrganization = createAsyncThunk(
  "settingsOrganization/updateOrganization",
  async (
    dataRecord: IApiRecordOrganization,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { record } = dataRecord;
      const response = await api.updateApiOrganization(record, token);
      if (!!response) {
        dispatch(editOrganization(record));
        toast.success("Запись изменена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const updateDestination = createAsyncThunk(
  "settingsDestination/updateDestination",
  async (
    dataRecord: IApiRecordDestination,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { record } = dataRecord;
      const response = await api.updateApiDestination(record, token);
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

export const updateProduct = createAsyncThunk(
  "settingsProduct/updateProduct",
  async (
    dataRecord: IApiRecordProduct,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { record } = dataRecord;
      const response = await api.updateApiProduct(record, token);
      if (!!response) {
        dispatch(editProduct(record));
        toast.success("Запись изменена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const updateForwarder = createAsyncThunk(
  "settingsForwarder/updateForwarder",
  async (
    dataRecord: IApiRecordForwarder,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { record } = dataRecord;
      const response = await api.updateApiForwarder(record, token);
      if (!!response) {
        dispatch(editForwarder(record));
        toast.success("Запись изменена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  "settingsOrganization/deleteOrganization",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const response = await api.deleteApiOrganization(id, token);
      if (!!response) {
        dispatch(removeOrganization(id));
        toast.success("Запись удалена");
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

      const response = await api.deleteApiDestination(id, token);
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

export const deleteProduct = createAsyncThunk(
  "settingsProduct/deleteProduct",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const response = await api.deleteApiProduct(id, token);
      if (!!response) {
        dispatch(removeProduct(id));
        toast.success("Запись удалена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const deleteForwarder = createAsyncThunk(
  "settingsForwarder/deleteForwarder",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const response = await api.deleteApiForwarder(id, token);
      if (!!response) {
        dispatch(removeForwarder(id));
        toast.success("Запись удалена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const createOrganization = createAsyncThunk(
  "settingsOrganization/createOrganization",
  async (
    dataRecord: IApiCreateRecordOrganization,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { newRecord } = dataRecord;
      const response = await api.newApiOrganization(newRecord, token);
      if (!!response) {
        dispatch(newOrganization(response.data.answerRecord));
        toast.success("Запись добавлена");
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
    dataRecord: IApiCreateRecordDestination,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { newRecord } = dataRecord;
      const response = await api.newApiDestination(newRecord, token);
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

export const createProduct = createAsyncThunk(
  "settingsProduct/createProduct",
  async (
    dataRecord: IApiCreateRecordProduct,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { newRecord } = dataRecord;
      const response = await api.newApiProduct(newRecord, token);
      if (!!response) {
        dispatch(newProduct(response.data.answerRecord));
        toast.success("Запись добавлена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const createForwarder = createAsyncThunk(
  "settingsForwarder/createForwarder",
  async (
    dataRecord: IApiCreateRecordForwarder,
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;

      const { newRecord } = dataRecord;
      const response = await api.newApiForwarder(newRecord, token);
      if (!!response) {
        dispatch(newForwarder(response.data.answerRecord));
        toast.success("Запись добавлена");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getOrganizations = createAsyncThunk(
  "settingsOrganization/getOrganizations",
  async (_, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;
      const response = await api.AllApiOrganizations(token);
      return response.data;
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
      const response = await api.allApiDestinations(token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "settingsProduct/getProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;
      const response = await api.allApiProducts(token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const getForwarders = createAsyncThunk(
  "settingsForwarder/getForwarders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.auth.statusUser.user.token;
      const response = await api.allApiForwarders(token);
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
    newOrganization: (state, action: PayloadAction<ISettingsOrganization>) => {
      state.statusSettings.allSettings.settingsOrganization.push(
        action.payload
      );
    },
    newDestination: (state, action: PayloadAction<ISettingsDestination>) => {
      state.statusSettings.allSettings.settingsDestination.push(action.payload);
    },
    newProduct: (state, action: PayloadAction<ISettingsProduct>) => {
      state.statusSettings.allSettings.settingsProduct.push(action.payload);
    },
    newForwarder: (state, action: PayloadAction<ISettingsForwarder>) => {
      state.statusSettings.allSettings.settingsForwarder.push(action.payload);
    },
    removeOrganization: (state, action: PayloadAction<string>) => {
      state.statusSettings.allSettings.settingsOrganization =
        state.statusSettings.allSettings.settingsOrganization.filter(
          (record) => record._id !== action.payload
        );
    },
    removeDestination: (state, action: PayloadAction<string>) => {
      state.statusSettings.allSettings.settingsDestination =
        state.statusSettings.allSettings.settingsDestination.filter(
          (record) => record._id !== action.payload
        );
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.statusSettings.allSettings.settingsProduct =
        state.statusSettings.allSettings.settingsProduct.filter(
          (record) => record._id !== action.payload
        );
    },
    removeForwarder: (state, action: PayloadAction<string>) => {
      state.statusSettings.allSettings.settingsForwarder =
        state.statusSettings.allSettings.settingsForwarder.filter(
          (record) => record._id !== action.payload
        );
    },
    editOrganization: (state, action: PayloadAction<ISettingsOrganization>) => {
      state.statusSettings.allSettings.settingsOrganization =
        state.statusSettings.allSettings.settingsOrganization.map((record) => {
          if (record._id === action.payload._id) {
            return {
              ...record,
              INN: action.payload.INN,
              name: action.payload.name,
              phone: action.payload.phone,
              address: action.payload.address,
              email: action.payload.email,
              KPP: action.payload.KPP,
              OGRN: action.payload.OGRN,
              paymentAccount: action.payload.paymentAccount,
              corAccount: action.payload.corAccount,
              BIC: action.payload.BIC,
              coordinates: action.payload.coordinates,
            };
          }
          return record;
        });
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
    editProduct: (state, action: PayloadAction<ISettingsProduct>) => {
      state.statusSettings.allSettings.settingsProduct =
        state.statusSettings.allSettings.settingsProduct.map((record) => {
          if (record._id === action.payload._id) {
            return {
              ...record,
              product: action.payload.product,
              unit: action.payload.unit,
            };
          }
          return record;
        });
    },
    editForwarder: (state, action: PayloadAction<ISettingsForwarder>) => {
      state.statusSettings.allSettings.settingsForwarder =
        state.statusSettings.allSettings.settingsForwarder.map((record) => {
          if (record._id === action.payload._id) {
            return {
              ...record,
              forwarder: action.payload.forwarder,
              birth: action.payload.birth,
              carNumber: action.payload.carNumber,
              carBrand: action.payload.carBrand,
            };
          }
          return record;
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDestinations.pending, setLoader);
    // builder.addCase(createDestination.pending, setLoader);
    // builder.addCase(deleteDestination.pending, setLoader);
    builder.addCase(getProducts.pending, setLoader);
    // builder.addCase(createProduct.pending, setLoader);
    // builder.addCase(deleteProduct.pending, setLoader);
    builder.addCase(getForwarders.pending, setLoader);
    // builder.addCase(createForwarder.pending, setLoader);
    // builder.addCase(deleteForwarder.pending, setLoader);

    builder.addCase(getDestinations.fulfilled, (state, { payload }) => {
      state.statusSettings.loading = false;
      state.statusSettings.allSettings.settingsDestination = payload;
    });
    // builder.addCase(createDestination.fulfilled, deleteLoader);
    // builder.addCase(deleteDestination.fulfilled, deleteLoader);
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.statusSettings.loading = false;
      state.statusSettings.allSettings.settingsProduct = payload;
    });
    // builder.addCase(createProduct.fulfilled, deleteLoader);
    // builder.addCase(deleteProduct.fulfilled, deleteLoader);
    builder.addCase(getForwarders.fulfilled, (state, { payload }) => {
      state.statusSettings.loading = false;
      state.statusSettings.allSettings.settingsForwarder = payload;
    });
    // builder.addCase(createForwarder.fulfilled, deleteLoader);
    // builder.addCase(deleteForwarder.fulfilled, deleteLoader);

    builder.addCase(getDestinations.rejected, setError);
    builder.addCase(deleteDestination.rejected, setError);
    builder.addCase(createDestination.rejected, setError);
    builder.addCase(updateDestination.rejected, setError);
    builder.addCase(getProducts.rejected, setError);
    builder.addCase(deleteProduct.rejected, setError);
    builder.addCase(createProduct.rejected, setError);
    builder.addCase(updateProduct.rejected, setError);
    builder.addCase(getForwarders.rejected, setError);
    builder.addCase(deleteForwarder.rejected, setError);
    builder.addCase(createForwarder.rejected, setError);
    builder.addCase(updateForwarder.rejected, setError);
  },
});

const {
  newOrganization,
  newDestination,
  newProduct,
  newForwarder,
  removeOrganization,
  removeDestination,
  removeProduct,
  removeForwarder,
  editOrganization,
  editDestination,
  editProduct,
  editForwarder,
} = settingsSlice.actions;

export const dataSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as api from "../api";
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
interface IApiRecordProduct {
  record: ISettingsProduct;
}
interface IApiRecordForwarder {
  record: ISettingsForwarder;
}
interface IApiCreateRecordOrganization {
  newRecord: ISettingsOrganizationShort;
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
        toast.success("???????????? ????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
        toast.success("???????????? ??????????????????");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);

const setError = (state: IStoreSettings, { payload }: any) => {
  state.statusSettings.loading = false;
  state.statusSettings.error = payload;
};

const setLoader = (state: IStoreSettings) => {
  state.statusSettings.loading = true;
  state.statusSettings.error = "";
};

const setEmptyError = (state: IStoreSettings) => {
  state.statusSettings.error = "";
};
/**
 * TODO:??????????????????????????????????, ???????? ?????????????????????? ????????????. ?? extraReducers ?????? ???? ?????????????????????? ??????????????????????????????????
 */
// const deleteLoader = (state: IStoreSettings) => {
//   state.statusSettings.loading = false;
// };

const settingsSlice = createSlice({
  name: "tablesSettings",
  initialState,
  reducers: {
    newOrganization: (state, action: PayloadAction<ISettingsOrganization>) => {
      state.statusSettings.allSettings.settingsOrganization.push(
        action.payload
      );
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
              bank: action.payload.bank,
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
    builder.addCase(getOrganizations.pending, setLoader);
    builder.addCase(createOrganization.pending, setEmptyError);
    // builder.addCase(createOrganization.pending, setLoader);
    // builder.addCase(deleteOrganization.pending, setLoader);
    builder.addCase(getProducts.pending, setLoader);
    builder.addCase(createProduct.pending, setEmptyError);
    // builder.addCase(createProduct.pending, setLoader);
    // builder.addCase(deleteProduct.pending, setLoader);
    builder.addCase(getForwarders.pending, setLoader);
    builder.addCase(createForwarder.pending, setEmptyError);
    // builder.addCase(createForwarder.pending, setLoader);
    // builder.addCase(deleteForwarder.pending, setLoader);

    builder.addCase(getOrganizations.fulfilled, (state, { payload }) => {
      state.statusSettings.loading = false;
      state.statusSettings.allSettings.settingsOrganization = payload;
    });
    // builder.addCase(createOrganization.fulfilled, deleteLoader);
    // builder.addCase(deleteOrganization.fulfilled, deleteLoader);
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

    builder.addCase(getProducts.rejected, setError);
    builder.addCase(deleteProduct.rejected, setError);
    builder.addCase(createProduct.rejected, setError);
    builder.addCase(updateProduct.rejected, setError);
    builder.addCase(getForwarders.rejected, setError);
    builder.addCase(deleteForwarder.rejected, setError);
    builder.addCase(createForwarder.rejected, setError);
    builder.addCase(updateForwarder.rejected, setError);
    builder.addCase(getOrganizations.rejected, setError);
    builder.addCase(deleteOrganization.rejected, setError);
    builder.addCase(createOrganization.rejected, setError);
    builder.addCase(updateOrganization.rejected, setError);
  },
});

const {
  newOrganization,
  newProduct,
  newForwarder,
  removeOrganization,
  removeProduct,
  removeForwarder,
  editOrganization,
  editProduct,
  editForwarder,
} = settingsSlice.actions;

export const dataSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;

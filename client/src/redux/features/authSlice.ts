import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IUser } from "../../models/User";
import * as api from "../api";
import { RootState } from "../store";

export interface IStatusUser {
  statusUser: {
    user: {
      token: string;
      userId: string;
    };
    error: unknown;
    loading: boolean;
  };
}

const initialState: IStatusUser = {
  statusUser: localStorage.getItem("statusUser")
    ? JSON.parse(localStorage.getItem("statusUser") || "{}")
    : {
        user: {
          token: "",
          userId: "",
        },
        error: "",
        loading: false,
      },
};

interface IDataLogin {
  formValue: IUser;
  toast: typeof toast;
}

export const login = createAsyncThunk(
  "auth/login",
  async (dataLogin: IDataLogin, { rejectWithValue }) => {
    try {
      const { formValue, toast } = dataLogin;
      const response = await api.signIn(formValue);
      toast.success("Вы авторизованы");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (dataLogin: IDataLogin, { rejectWithValue }) => {
    try {
      const { formValue, toast } = dataLogin;
      const response = await api.signUp(formValue);
      toast.success("Вы зарегистрированы");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<string>) => {
      state.statusUser.user = { token: "", userId: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, { payload }) => {
      state.statusUser.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.statusUser.loading = false;
      state.statusUser.user = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.statusUser.loading = false;
      state.statusUser.error = payload;
    });
    builder.addCase(register.pending, (state, { payload }) => {
      state.statusUser.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.statusUser.loading = false;
      state.statusUser.user = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.statusUser.loading = false;
      state.statusUser.error = payload;
    });
  },
});

export const { removeUser } = authSlice.actions;

export const dataUser = (state: RootState) => state.auth;

export default authSlice.reducer;

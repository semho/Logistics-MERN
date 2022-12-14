import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUser } from "../../models/User";
import * as api from "../api";
import { RootState } from "../store";

export interface IStatusUser {
  statusUser: {
    user: IAppUser;
    error: unknown;
    loading: boolean;
  };
}

interface IAppUser {
  token: string;
  userId: string;
  refreshToken: string;
}

const initialState: IStatusUser = {
  statusUser: localStorage.getItem("statusUser")
    ? JSON.parse(localStorage.getItem("statusUser") || "{}")
    : {
        user: {
          token: "",
          userId: "",
          refreshToken: "",
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);

const setLoad = (state: IStatusUser) => {
  state.statusUser.loading = true;
  state.statusUser.error = "";
};

const setPayload = (state: IStatusUser, { payload }: any) => {
  state.statusUser.loading = false;
  state.statusUser.user = payload;
};

const setError = (state: IStatusUser, { payload }: any) => {
  state.statusUser.loading = false;
  state.statusUser.error = payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state: IStatusUser, action: PayloadAction<string>) => {
      state.statusUser.user = { token: "", userId: "", refreshToken: "" };
    },
    replaceToken: (state: any, action: PayloadAction<string>) => {
      state.statusUser.user.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, setLoad);
    builder.addCase(login.fulfilled, setPayload);
    builder.addCase(login.rejected, setError);
    builder.addCase(register.pending, setLoad);
    builder.addCase(register.fulfilled, setPayload);
    builder.addCase(register.rejected, setError);
  },
});

export const { removeUser, replaceToken } = authSlice.actions;

export const dataUser = (state: RootState) => state.auth;

export default authSlice.reducer;

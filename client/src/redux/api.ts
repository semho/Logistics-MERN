import axios from "axios";
import { IUser } from "../models/User";

export const signIn = (formDate: IUser) =>
  axios.post("/api/auth/login", formDate);

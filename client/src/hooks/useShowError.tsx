import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/store";
import { useMessage } from "./useMessage";

export function useShowError(error: unknown) {
  const [errorRecord, setErrorRecord] = useState("");
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const message = useMessage();
  //показываем ошибки, если есть
  useEffect(() => {
    setErrorRecord((error as Error).message);
    error && message(errorRecord, "error");
  }, [error, errorRecord, message]);
  //удаляем ошибки
  useEffect(() => {
    // if (error?.hasOwnProperty("jwtSessionClose")) {
    //   console.log("ok");
    //   // dispatch(removeUser(""));
    //   history("/");
    // }
    setErrorRecord("");
  }, [dispatch, error, history]);
}

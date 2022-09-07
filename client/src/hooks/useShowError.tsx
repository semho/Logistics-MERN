import { useEffect, useState } from "react";
import { useMessage } from "./useMessage";

export function useShowError(error: unknown) {
  const [errorRecord, setErrorRecord] = useState("");
  const message = useMessage();
  //показываем ошибки, если есть
  useEffect(() => {
    setErrorRecord((error as Error).message);
    error && message(errorRecord, "error");
  }, [error, errorRecord, message]);
  //удаляем ошибки
  useEffect(() => {
    setErrorRecord("");
  }, []);
}

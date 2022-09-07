import { dataUser, IStatusUser } from "../redux/features/authSlice";
import { useAppSelector } from "../redux/store";

export function useToken() {
  //данные пользователя из redux
  const {
    statusUser: { user },
  }: IStatusUser = useAppSelector(dataUser);
  const { token } = user || "";

  return token;
}

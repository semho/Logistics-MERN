import { useCallback, useState } from "react";

// interface IUser {
//   email: string;
//   password: string;
// }

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: null | BodyInit = null,
      headers = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          headers = {
            "Content-Type": "application/json",
          };
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        return data;
      } catch (e) {
        setError((e as Error).message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(""), []);

  return {
    loading,
    request,
    error,
    clearError,
  };
}

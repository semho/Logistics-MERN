import { useCallback } from "react";
import { toast } from "react-toastify";
/**
 * Валидация полей формы
 * @returns
 */
export function useValidate() {
  /**
   * Проверка на пустоту
   * @param text - строка, которую проверяем
   * @param whatChecking - название поля проверки
   * @returns - всплывающий тост с ошибкой
   */
  const emptyField = useCallback((text: string, whatChecking: string) => {
    if (!text) {
      return toast.error(`${whatChecking} не может быть пустым`);
    }
  }, []);
  /**
   * Проверка на ноль
   * @param number - поле с типом number, которую проверяем
   * @param whatChecking - название поля проверки
   * @returns - всплывающий тост с ошибкой
   */
  const zeroField = useCallback((number: number, whatChecking: string) => {
    if (number === 0) {
      return toast.error(`${whatChecking} не может быть ноль или пусто`);
    }
  }, []);
  /**
   * Проверка по регулярному выражению на корректность Email
   * @param text - строка с email
   * @returns - всплывающий тост с ошибкой
   */
  const matchEmail = useCallback((text: string) => {
    if (!validateEmail(text)) {
      return toast.error("Введите корректный Email");
    }
  }, []);
  /**
   * Проверка на длину
   * @param text - строка, которую проверяем
   * @param whatChecking - название поля проверки
   * @param count - количество символов
   * @returns - всплывающий тост с ошибкой
   */
  const checkingLength = useCallback(
    (text: string, whatChecking: string, count: number) => {
      if (Number(text.length) < count) {
        return toast.error(
          `${whatChecking} не может быть короче ${count} символов`
        );
      }
    },
    []
  );
  /**
   * Регулярное выражение для проверки корректности email
   * @param email - строка с email
   * @returns - возвращает true или false
   */
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return {
    checkingLength,
    matchEmail,
    emptyField,
    zeroField,
  };
}

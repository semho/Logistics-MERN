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

  /**
   * Ограничивает число вводимых символов в input. Использовать только в обработчике управляемой компоненты
   * @param name - нзвание поля инпут
   * @param max - максимальное число символов
   * @param event - событие в обработчике
   */

  const limitNumberCharacters = (
    name: string,
    max: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.name === name) {
      event.target.value = event.target.value.substring(0, max);
    }
  };

  /**
   * Маска номер телефона
   * @param field название поля в инпут
   * @param event событие
   */
  function mask(field: string, event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name !== field) return;
    const pos = event.target.selectionStart;
    if (pos! < 3) event.preventDefault();
    const matrix = "(___) ___ ____";
    let i = 0;
    const def = matrix.replace(/\D/g, "");
    const val = event.target.value.replace(/\D/g, "");
    let new_value = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = new_value.indexOf("_");
    if (i !== -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i);
    }

    event.target.value = new_value;
  }

  return {
    checkingLength,
    matchEmail,
    emptyField,
    zeroField,
    limitNumberCharacters,
    mask,
  };
}

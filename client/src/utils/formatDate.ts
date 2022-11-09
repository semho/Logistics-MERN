/**
 * Функция преобразует дату в требуемый формат
 * @param date - строка с датой
 * @returns - возвращаем форма даты в в виде (ДД.ММ.ГГ ЧЧ.ММ)
 */
export function formatDate(
  date: string,
  time = true,
  reverse = false,
  fullYear = false
) {
  const newDate = new Date(date);

  let dd = String(newDate.getDate());
  if (Number(dd) < 10) dd = "0" + dd;

  let mm = String(newDate.getMonth() + 1);
  if (Number(mm) < 10) mm = "0" + mm;

  let yy = "";
  if (fullYear) {
    yy = String(newDate.getFullYear());
  } else {
    yy = String(newDate.getFullYear() % 100);
    if (Number(yy) < 10) yy = "0" + yy;
  }

  let hour = String(newDate.getHours());
  hour = Number(hour) < 10 ? "0" + hour : hour;

  let minutes = String(newDate.getMinutes());
  minutes = Number(minutes) < 10 ? "0" + minutes : minutes;

  if (reverse) {
    if (time) {
      return `${yy}-${mm}-${dd} ${hour}:${minutes}`;
    }

    return `${yy}-${mm}-${dd}`;
  }

  if (time) {
    return `${dd}-${mm}-${yy} ${hour}:${minutes}`;
  }

  return `${dd}-${mm}-${yy}`;
}

/**
 * Функция преобразует дату в требуемый формат
 * @param date - строка с датой
 * @returns - возвращаем форма даты в в виде (ДД.ММ.ГГ ЧЧ.ММ)
 */
export function formatDate(date: string) {
  const newDate = new Date(date);

  let dd = String(newDate.getDate());
  if (Number(dd) < 10) dd = "0" + dd;

  let mm = String(newDate.getMonth() + 1);
  if (Number(mm) < 10) mm = "0" + mm;

  let yy = String(newDate.getFullYear() % 100);
  if (Number(yy) < 10) yy = "0" + yy;

  let hour = String(newDate.getHours());
  hour = Number(hour) < 10 ? "0" + hour : hour;

  let minutes = String(newDate.getMinutes());
  minutes = Number(minutes) < 10 ? "0" + minutes : minutes;

  return `${dd}.${mm}.${yy} ${hour}:${minutes}`;
}
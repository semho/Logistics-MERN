import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";
import { IListRecords, initialEmptyState, IRecord } from "../../models/Record";
import { formatDate } from "../../utils/formatDate";
import { ButtonStyled } from "../ButtonStyled";
import { InputStyled } from "../InputStyled";
import { Modal } from "../Modal/Modal";

interface ITable {
  list: IListRecords;
  deleteRecordFromList: (value: IRecord) => void;
  updateRecordFromList: (value: IRecord) => void;
}

export function Table({
  list,
  deleteRecordFromList,
  updateRecordFromList,
}: ITable) {
  const [modalActiveDelete, setModalActiveDelete] = useState(false);
  const [modalActiveEdit, setModalActiveEdit] = useState(false);
  const [record, setRecord] = useState<IRecord>(initialEmptyState);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (record) {
      setRecord({
        ...record,
        [event.target.name]: event.target.value,
      });
    }
  };
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    message(error, "error");
    clearError();
  }, [clearError, error, message]);

  //удаление записи
  const deleteRecord = async () => {
    if (record) {
      try {
        const data = await request(
          "/api/records/delete",
          "DELETE",
          JSON.stringify({ ...record }),
          {
            Authorization: `Bearer ${token}`,
          }
        );
        deleteRecordFromList(record);
        message(data.message, "info");
        setModalActiveDelete(false);
      } catch (e) {}
    }
  };
  //редактирование записи
  const editRecordHandler = async () => {
    if (record) {
      try {
        const data = await request(
          "/api/records/update",
          "PUT",
          JSON.stringify({ ...record }),
          {
            Authorization: `Bearer ${token}`,
          }
        );

        updateRecordFromList(record);
        message(data.message, "info");
        setModalActiveEdit(false);
      } catch (e) {}
    }
  };
  //открываем модальное окно
  const openModal =
    (isDelete: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      isDelete ? setModalActiveDelete(true) : setModalActiveEdit(true);
      //получаем id записи для модального окна
      const idRecord = (event.target as HTMLButtonElement).parentElement!
        .parentElement!.id;
      const record = list.find((record) => record._id === idRecord);

      if (record) {
        setRecord(record);
      }
    };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Дата
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Откуда-Куда
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Расстояние, км
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Товар
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Количество, м3
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Ответственный
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Стоимость единицы, руб
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Сумма товара, руб
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((record, index) => {
                  return (
                    <tr className="border-b" key={record._id} id={record._id}>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatDate(record.date)}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.fromTo}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.distance}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.product}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.units}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.forwarder}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.price}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {record.sum}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <ButtonStyled
                          title="Изменить"
                          variant="sky"
                          type="button"
                          disabled={false}
                          className="mr-2"
                          onClick={openModal(false)}
                        />
                        <ButtonStyled
                          title="Удалить"
                          variant="rose"
                          type="button"
                          disabled={false}
                          onClick={openModal(true)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal active={modalActiveDelete} setActive={setModalActiveDelete}>
        <h3 className="text-xl text-center mb-5">
          Вы действительно хотите удалить запись? {record?._id}
        </h3>
        <div className="text-center">
          <ButtonStyled
            title="Да"
            variant="rose"
            type="button"
            disabled={loading}
            className="mr-5"
            onClick={deleteRecord}
          />
          <ButtonStyled
            title="Отмена"
            variant="gray"
            type="button"
            disabled={loading}
            onClick={() => setModalActiveDelete(false)}
          />
        </div>
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
        <h3 className="text-xl text-center mb-5">
          Измененине записи {record?._id}
        </h3>
        <div>
          <InputStyled
            value={record.fromTo}
            colorFocus="sky"
            type="text"
            placeholder="Откуда-Куда"
            name="fromTo"
            onChange={changeHandler}
            className="my-2"
          />
          <InputStyled
            value={record.distance}
            colorFocus="sky"
            type="text"
            placeholder="Расстояние"
            name="distance"
            onChange={changeHandler}
            className="my-2"
          />
          <InputStyled
            value={record.product}
            colorFocus="sky"
            type="text"
            placeholder="Продукт"
            name="product"
            onChange={changeHandler}
            className="my-2"
          />
          <InputStyled
            value={record.units}
            colorFocus="sky"
            type="text"
            placeholder="Количество"
            name="units"
            onChange={changeHandler}
            className="my-2"
          />
          <InputStyled
            value={record.forwarder}
            colorFocus="sky"
            type="text"
            placeholder="Ответственный"
            name="forwarder"
            onChange={changeHandler}
            className="my-2"
          />
          <InputStyled
            value={record.price}
            colorFocus="sky"
            type="text"
            placeholder="Стоимость единицы"
            name="price"
            onChange={changeHandler}
            className="my-2"
          />
          <div className="text-center">
            <ButtonStyled
              title="Изменить"
              variant="sky"
              type="button"
              disabled={loading}
              className="mr-5"
              onClick={editRecordHandler}
            />
            <ButtonStyled
              title="Отмена"
              variant="gray"
              type="button"
              disabled={loading}
              onClick={() => setModalActiveEdit(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

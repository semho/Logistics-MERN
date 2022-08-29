import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";
import { IListRecords, IRecord } from "../../models/Record";
import { formatDate } from "../../utils/formatDate";
import { ButtonStyled } from "../ButtonStyled";
import { Modal } from "../Modal/Modal";

interface ITable {
  list: IListRecords;
  deleteRecordFromList: (value: IRecord) => void;
}

export function Table({ list, deleteRecordFromList }: ITable) {
  const [modalActive, setModalActive] = useState(false);
  const [record, setRecord] = useState<IRecord>();
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
          "POST",
          JSON.stringify({ ...record }),
          {
            Authorization: `Bearer ${token}`,
          }
        );
        deleteRecordFromList(record);
        message(data.message, "info");
        setModalActive(false);
      } catch (e) {}
    }
  };
  //открываем модальное окно
  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalActive(true);
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
                        />
                        <ButtonStyled
                          title="Удалить"
                          variant="rose"
                          type="button"
                          disabled={false}
                          onClick={openModal}
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
      <Modal active={modalActive} setActive={setModalActive}>
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
            onClick={() => setModalActive(false)}
          />
        </div>
      </Modal>
    </div>
  );
}

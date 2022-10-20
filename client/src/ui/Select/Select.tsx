import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/Icons/SearchIcon";
import { SelectIcon } from "../../assets/Icons/SelectIcon";

export interface IList {
  id: string;
  name: string;
}

interface ISelect {
  id?: string;
  title?: string;
  list?: IList[];
  updateSelect: React.Dispatch<React.SetStateAction<{}>>;
  nameSelect?: string;
}

export function Select({
  title = "Выбрать",
  id,
  list,
  updateSelect,
  nameSelect = "select",
}: ISelect) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //передаем родителю стейт
    updateSelect({
      [nameSelect]: selected,
      [nameSelect + "_id"]: selectedId,
    });
  }, [nameSelect, selected, selectedId, updateSelect]);

  return (
    <div
      className={`font-normal relative form-control border border-solid border-gray-300 rounded transition ease-in-out ${
        open && "border-sky-500"
      }`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full px-3 py-1.5 flex items-center justify-between rounded cursor-pointer ${
          !selected && "text-gray-700"
        } `}
      >
        {selected ? selected : title}
        <div className={`${open && "rotate-180"}`}>
          <SelectIcon />
        </div>
      </div>
      <ul
        className={`bg-white w-full absolute border border-solid border-sky-500 rounded ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <div>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Поиск"
            className="placeholder: text-gray-700 p-2 outline-none w-full"
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            value={inputValue}
          />
        </div>
        {list?.map((item) => (
          <li
            id={item.id}
            key={item.id}
            className={`p-2 text-sm hover:bg-sky-500 hover:text-white cursor-pointer
            ${
              item?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-500 text-white"
            }
            ${
              item?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(item?.name);
                setSelectedId(item?.id);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

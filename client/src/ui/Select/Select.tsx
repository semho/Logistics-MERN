import React, { useState } from "react";
import { SearchIcon } from "../../assets/Icons/SearchIcon";
import { SelectIcon } from "../../assets/Icons/SelectIcon";

// interface IList {
//   id: string;
//   name: string;
// }

interface ISelect {
  title?: string;
}

export function Select({title = "Выберете значение"}:ISelect) {
  const list = [
    { id: "1asdasd", name: "Первый" },
    { id: "2dddd", name: "Второй" },
    { id: "3qweqw", name: "Третий" },
  ];

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="font-medium relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"}`}>
        {selected ? selected : title}
        <div className={`${open && 'rotate-180'}`}>
          <SelectIcon/>
        </div>
      </div>
      <ul className={`bg-white w-full absolute ${open ? 'block' : 'hidden'}`}>
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <div>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Поиск"
            className="placeholder: text-gray-700 p-2 outline-none"
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            value={inputValue}
          />
        </div>
        {list?.map((item) => (
          <li
            id={item.id}
            key={item.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${item?.name?.toLowerCase() === selected?.toLowerCase() && 'bg-sky-600 text-white' }
            ${item?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
            onClick={() => {
              if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(item?.name)
                setOpen(false)
                setInputValue("")
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

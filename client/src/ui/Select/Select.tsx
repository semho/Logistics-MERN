import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/Icons/SearchIcon";
import { SelectIcon } from "../../assets/Icons/SelectIcon";

interface IList {
  id: string;
  name: string;
}

export function Select() {
  const some = [
    { id: "1asdasd", name: "Первый" },
    { id: "2dddd", name: "Второй" },
    { id: "3qweqw", name: "Третий" },
  ];

  const [list, setList] = useState<Array<IList>>();
  useEffect(() => {
    setList(some);
  }, []);

  return (
    <div className="w-72 font-medium h-80">
      <div className="bg-white w-full p-2 flex items-center justify-between rounded">
        Select some
        <SelectIcon size={6} />
      </div>
      <ul className="bg-white mt-2 overflow-y-auto max-h-60">
        <div className="flex items-center px-2">
          <SearchIcon size={6} />
          <input
            type="text"
            placeholder="Поиск"
            className="placeholder: text-gray-700 p-2 outline-none"
          />
        </div>
        {list?.map((item) => (
          <li
            id={item.id}
            key={item.id}
            className="p-2 text-sm hover:bg-sky-600 hover:text-white"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

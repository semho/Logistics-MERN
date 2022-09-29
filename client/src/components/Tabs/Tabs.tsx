import React, { useState } from "react";
import { TabContent } from "./TabContent";

interface ITab {
  title: string;
  contentElementJSX: JSX.Element;
}

interface ITabs {
  items: ITab[];
}

export function Tabs({ items }: ITabs) {
  const [active, setActive] = useState(0);

  const openTab = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setActive(Number((event.target as HTMLElement).dataset.index));
  };

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="md:flex flex-wrap -mb-px">
          {items.map((n, i) => (
            <li className="mr-2" key={i}>
              <span
                className={`tablinks md:text-base ${
                  i === active
                    ? "active inline-block p-4 text-purple-600 rounded-t-lg border-b-2 border-purple-600 dark:text-purple-500 dark:border-purple-500"
                    : "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } `}
                onClick={openTab}
                data-index={i}
              >
                {n.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {items[active] && <TabContent {...items[active]} />}
    </>
  );
}

import React from "react";
import { TableHead } from "../../Table/TableHead";
import TableRow from "./TableRow/TableRow";

interface ITableSettings {
  nameThead: string[];
  data: {
    [key: string]: string | number;
  }[];
}

export default function TableSettings({ nameThead, data }: ITableSettings) {
  return (
    <div className="flex flex-col md:mx-20">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <TableHead cellNames={nameThead} />
              <tbody>
                {data.map((item, index) => {
                  return (
                    <TableRow
                      key={item.id}
                      id={item.id}
                      valueRow={item}
                      index={index + 1}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

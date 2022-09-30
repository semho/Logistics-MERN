import React, { useEffect, useState } from 'react'
import { TableContent } from '../../UI/TableContent/TableContent';
import { TableRow } from '../TableRow';

interface IOBjRow {
  [key: string]: string | number;
}

interface IListOBjRow extends Array<IOBjRow> {}

interface ITable {
  headings:string[];
  records: IListOBjRow;
}

export function TableSettings({headings, records}: ITable) {
  const [list, setList] = useState<IListOBjRow>([]);

  useEffect(() => {
    setList(records);
  }, [records]);

  return (
    <TableContent nameThead={headings}>
      {list.map((record, index) => {
        return (
          <TableRow
            key={record.id}
            id={String(record.id)}
            valueRow={record}
            index={index + 1}
          />
        );
      })}
    </TableContent>
  );
}

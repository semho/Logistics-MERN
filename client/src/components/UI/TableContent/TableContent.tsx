import React from 'react'
import { TableHead } from '../TableHead';

interface ITableContent {
  nameThead: string[];
  children?: React.ReactNode;
}

export function TableContent({ nameThead, children }: ITableContent) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <TableHead cellNames={nameThead} />
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

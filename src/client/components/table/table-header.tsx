import * as React from 'react';
import { TableColumn } from './table';

export interface TableHeaderProps {
  columns: TableColumn[];
  filterColumn: (key: string, value: string) => void;
}

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {props.columns
          .filter((column: TableColumn) => column.show)
          .map((column: TableColumn, colNum: number) => {
            return (
              <th key={colNum}>
                {column.name}
                <input
                  className="input is-small"
                  type="text"
                  placeholder="Filter"
                  onChange={({ target }: any) =>
                    props.filterColumn(column.key, target.value)
                  }
                />
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

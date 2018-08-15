import * as React from 'react';
import { TableColumn } from './table-container';

export interface TableHeaderProps {
  columns: TableColumn[];
}

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {props.columns.map((column: TableColumn, colNum: number) => {
          return <th key={colNum}>{column.name}</th>;
        })}
      </tr>
    </thead>
  );
};

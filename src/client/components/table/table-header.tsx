import * as React from 'react';
import { TableColumn } from './table';

export interface TableHeaderProps {
  columns: TableColumn[];
  filterColumn: (key: string, value: string) => void;
}

export class TableHeader extends React.Component<TableHeaderProps, null> {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns
            .filter(row => row.show)
            .map((column: TableColumn, colNum: number) => {
              return (
                <th key={colNum}>
                  {column.name}
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Filter"
                    onChange={({ target }: any) =>
                      this.props.filterColumn(column.key, target.value)
                    }
                  />
                </th>
              );
            })}
        </tr>
      </thead>
    );
  }
}

import * as React from 'react';
import { TableHeader } from './table-header';
import { TableFooter } from './table-footer';

export interface TableColumn {
  key: string;
  name: string;
  show: boolean;
}

export interface TableProps {
  data: any;
  columns: TableColumn[];
  filterData: (key: string, value: string) => void;
}

export class Table extends React.Component<TableProps> {
  render() {
    return (
      <div className="container scroll-x">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <TableHeader
            columns={this.props.columns}
            filterColumn={this.props.filterData.bind(this)}
          />
          <TableFooter colSpan={this.props.columns.length} />
          <tbody>{this.createRows()}</tbody>
        </table>
      </div>
    );
  }

  createRows() {
    return this.props.data.map((row: any, rowNum: number) => {
      return (
        <tr key={rowNum}>
          {this.props.columns
            .filter(row => row.show)
            .map((column: TableColumn, colNum: number) => {
              return <td key={colNum}>{row[column.key]}</td>;
            })}
        </tr>
      );
    });
  }
}

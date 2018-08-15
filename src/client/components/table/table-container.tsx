import * as React from 'react';
import mockData from './mockData';
import { TableHeader } from './table-header';

export interface TableColumn {
  key: string;
  name: string;
}

export const COLUMNS: TableColumn[] = [
  { key: 'author', name: 'Author' },
  { key: 'content', name: 'Content' },
  { key: 'region', name: 'Region' },
  { key: 'language', name: 'Language' },
  { key: 'publish_date', name: 'Publish Date' },
  { key: 'harvested_date', name: 'Harvested Date' },
  { key: 'following', name: 'Following' },
  { key: 'followers', name: 'Followers' },
  { key: 'updates', name: 'Updates' },
  { key: 'post_type', name: 'Post Type' },
  { key: 'account_type', name: 'Account Type' },
  { key: 'new_june_2018', name: 'New in June?' },
  { key: 'retweet', name: 'Retweet?' },
  { key: 'account_category', name: 'Account Category' },
];

export class Table extends React.Component {
  data = mockData;
  columns: TableColumn[] = COLUMNS;

  render() {
    return (
      <section className="section">
        <div className="container scroll-x">
          <h1 className="title">Tweets</h1>
          <table className="table is-bordered">
            <TableHeader columns={this.columns} />
            <tbody>{this.createRows()}</tbody>
          </table>
        </div>
      </section>
    );
  }

  createRows() {
    return this.data.map((row: any, rowNum: number) => {
      return (
        <tr key={rowNum}>
          {this.columns.map((column: TableColumn, colNum: number) => {
            return <td key={colNum}>{row[column.key]}</td>;
          })}
        </tr>
      );
    });
  }
}

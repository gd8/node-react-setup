import * as React from 'react';
import { Header } from './layout/header';
import { Table, TableColumn } from './components/table/table';
import {
  MultiSelect,
  SelectOption,
} from './components/multiselect/multiselect';
import { mockData } from './components/table/mockData';

export const COLUMNS: TableColumn[] = [
  { key: 'author', name: 'Author', show: true },
  { key: 'content', name: 'Content', show: true },
  { key: 'region', name: 'Region', show: true },
  { key: 'language', name: 'Language', show: true },
  { key: 'publish_date', name: 'Publish Date', show: true },
  { key: 'harvested_date', name: 'Harvested Date', show: true },
  { key: 'following', name: 'Following', show: false },
  { key: 'followers', name: 'Followers', show: false },
  { key: 'updates', name: 'Updates', show: false },
  { key: 'post_type', name: 'Post Type', show: false },
  { key: 'account_type', name: 'Account Type', show: false },
  { key: 'new_june_2018', name: 'New in June?', show: false },
  { key: 'retweet', name: 'Retweet?', show: false },
  { key: 'account_category', name: 'Account Category', show: false },
];

export interface AppState {
  data: any;
  columns: TableColumn[];
}

class App extends React.Component<any, AppState> {
  allData = mockData;
  constructor(props: any) {
    super(props);
    this.state = {
      data: mockData,
      columns: COLUMNS,
    };
  }

  filterColumns(option: SelectOption) {
    console.log('option in parent', option);
    const { columns } = this.state;
    this.setState({
      columns: columns.map(column => {
        if (column.key === option.key) {
          return option;
        }
        return column;
      }),
    });
  }

  filterData(key: string, value: string) {
    this.setState({
      data: this.allData.filter((row: any) => {
        // TODO: refactor to helper
        return row[key].toLowerCase().indexOf(value.toLowerCase()) > -1;
      }),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <section className="section">
          <MultiSelect
            options={this.state.columns}
            toggleOption={(option: SelectOption) => this.filterColumns(option)}
          />
          <Table
            data={this.state.data}
            columns={this.state.columns}
            filterData={this.filterData.bind(this)}
          />
        </section>
      </div>
    );
  }
}

export default App;

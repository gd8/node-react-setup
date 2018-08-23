import * as React from 'react';

export interface TableFooterProps {
  colSpan: number;
}

export const TableFooter = (props: TableFooterProps) => {
  return (
    <tfoot>
      <tr className="footer-row">
        <th colSpan={props.colSpan}>End</th>
      </tr>
    </tfoot>
  );
};

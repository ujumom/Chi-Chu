import { TableRow, Typography } from '@mui/material';

import TableCellNoUnderline from '../TableCellNoUnderline';

type PriceListType = {
  product_code: string;
  rate: number;
};

function TablePriceRow({ list }: { list: PriceListType[] }) {
  return (
    <>
      <TableRow>
        <TableCellNoUnderline>
          <Typography noWrap fontSize="1.15rem" fontFamily="NotoSansKRBold">
            보험료
            <span> </span>
          </Typography>
        </TableCellNoUnderline>
        {list.map(item => (
          <TableCellNoUnderline align="center" key={item.product_code}>
            {'월 ' + item.rate.toLocaleString() + '원'}
          </TableCellNoUnderline>
        ))}
      </TableRow>
    </>
  );
}

export default TablePriceRow;

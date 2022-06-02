import { TableRow, Typography } from '@mui/material';

import QuestionTooltip from '../../PlanDetail/QuestionTooltip';
import TableBlankCells from '../TableBlankCells';
import TableCellNoUnderline from '../TableCellNoUnderline';
import VerticalBar from '../../Common/VerticalBar';

type chichuType = {
  product_code: string;
  total_index: number;
};

function TableRowBarPlot({ list }: { list: chichuType[] }) {
  return (
    <>
      <TableRow>
        <TableCellNoUnderline>
          <Typography noWrap fontSize="1.15rem" fontFamily="NotoSansKRBold">
            치츄지수
            <span> </span>
            <QuestionTooltip />
          </Typography>
        </TableCellNoUnderline>
        <TableBlankCells num={list.length} isNotUnderlined />
      </TableRow>
      <TableRow>
        <TableCellNoUnderline></TableCellNoUnderline>
        {list.map(item => (
          <TableCellNoUnderline align="center" key={item.product_code}>
            <VerticalBar value={item.total_index} />
          </TableCellNoUnderline>
        ))}
      </TableRow>
    </>
  );
}

export default TableRowBarPlot;

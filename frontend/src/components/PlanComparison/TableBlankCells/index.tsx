import { TableCell } from '@mui/material';

import TableCellNoUnderline from '../TableCellNoUnderline';
import { range } from '../../../utils/arrayFunctions';

function TableBlankCells({
  num,
  isNotUnderlined,
}: {
  num: number;
  isNotUnderlined?: boolean;
}) {
  return (
    <>
      {range(num).map(index =>
        isNotUnderlined ? (
          <TableCellNoUnderline key={index}></TableCellNoUnderline>
        ) : (
          <TableCell key={index}></TableCell>
        ),
      )}
    </>
  );
}

export default TableBlankCells;

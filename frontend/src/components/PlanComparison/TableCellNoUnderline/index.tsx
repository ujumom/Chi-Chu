import { TableCell, TableCellProps } from '@mui/material';

function TableCellNoUnderline(props: TableCellProps) {
  return (
    <TableCell
      {...props}
      sx={{
        borderBottomWidth: 0,
        fontSize: '1rem',
        fontFamily: 'NotoSansKRMedium',
      }}
    >
      {props.children}
    </TableCell>
  );
}

export default TableCellNoUnderline;

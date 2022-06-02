import { TableCell, TableRow, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import LongModal from '../../PlanDetail/Modal/LongModal';
import TableBlankCells from '../TableBlankCells';
import { grey } from '../../../styles/Colors';
import { ComparisonTableRowType } from '../../../types/types';

type TableRowGroupType = {
  optionGroupName: string;
  options: ComparisonTableRowType[];
  helpContent: JSX.Element;
};

function TableRowGroup(props: TableRowGroupType) {
  return (
    <>
      {/* 그룹 담보명 */}
      <TableRow>
        <TableCell>
          <Typography noWrap fontSize="1.15rem" fontFamily="NotoSansKRBold">
            {props.optionGroupName}
            <LongModal
              element={props.helpContent}
              icon={
                <HelpOutlineIcon
                  sx={{ cursor: 'pointer', paddingTop: '4px' }}
                />
              }
            />
          </Typography>
        </TableCell>
        <TableBlankCells num={props.options[0].option_code.length - 3} />
      </TableRow>

      {/* 세부 담보들 */}
      {props.options.map(option => (
        <TableRow key={option.option_name}>
          {/* 해당 담보명 */}
          <TableCell
            sx={{
              backgroundColor: '#daecff',
              paddingLeft: '30px',
              fontFamily: 'NotoSansKRLight',
            }}
          >
            {option.option_name}
          </TableCell>
          {/* 해당 담보에 대한 각 보험 상품들 보장 목록 */}
          {option.coverage.map((value, col) => (
            <TableCell
              align="center"
              key={col}
              sx={{ fontSize: '1rem', fontFamily: 'NotoSansKRMedium' }}
            >
              {value !== '0' ? value + '만원' : '-'}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default TableRowGroup;

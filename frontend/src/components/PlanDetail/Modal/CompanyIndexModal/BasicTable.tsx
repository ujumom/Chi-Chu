import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHeadText, TableBodyText } from './styles';

function createData(
  company_logo: string,
  company_name: string,
  company_index: number,
  non_payment_rate: number,
  complaints: number,
  payment_period: number,
  delay_period: number,
  delay_rate: number,
  capital_ratio: number,
  debt_ratio: number,
  net_assets: number,
) {
  return {
    company_logo,
    company_name,
    company_index,
    non_payment_rate,
    complaints,
    payment_period,
    delay_period,
    delay_rate,
    capital_ratio,
    debt_ratio,
    net_assets,
  };
}

const rows = [
  createData(
    '/images/CompanyLogo/교보라이프플래닛.png',
    '교보라이프플래닛',
    86.54,
    0.38,
    1.84,
    0.85,
    6.2,
    0,
    353.24,
    733.9619238,
    94,
  ),
  createData(
    '/images/CompanyLogo/교보생명.png',
    '교보생명',
    73.02,
    0.38,
    1.84,
    0.85,
    6.2,
    0,
    353.24,
    733.9619238,
    94,
  ),
  createData(
    '/images/CompanyLogo/라이나생명.png',
    '라이나생명',
    73.97,
    0.46,
    3.44,
    1.05,
    8.3,
    10.31,
    336.04,
    2081.629534,
    1966,
  ),
  createData(
    '/images/CompanyLogo/미래에셋생명.png',
    '미래에셋생명',
    67.37,
    0.89,
    3.38,
    1.27,
    5.74,
    36.49,
    300.92,
    802.8936469,
    1917,
  ),
  createData(
    '/images/CompanyLogo/삼성생명.png',
    '삼성생명',
    78.2,
    1.06,
    5.86,
    1.66,
    5.9,
    19.84,
    263.95,
    508.7299728,
    33866,
  ),
  createData(
    '/images/CompanyLogo/삼성화재.png',
    '삼성화재',
    65.27,
    1.67,
    7.78,
    0.68,
    13.36,
    16.85,
    300.9,
    508.7299728,
    15319,
  ),
  createData(
    '/images/CompanyLogo/에이스손해보험.png',
    '에이스손해보험',
    66.87,
    1.26,
    2.97,
    2.03,
    9.65,
    10.7,
    264,
    376.0449928,
    194,
  ),
  createData(
    '/images/CompanyLogo/ABL인터넷보험.png',
    'ABL 인터넷보험',
    59.98,
    0.61,
    3.61,
    2.18,
    5.66,
    46.39,
    211.6,
    1623.89854,
    8799,
  ),
  createData(
    '/images/CompanyLogo/DB손해보험.png',
    'DB손해보험',
    56.4,
    1.46,
    9.87,
    1.02,
    12.93,
    20.5,
    207.54,
    709.5643733,
    6139,
  ),
  createData(
    '/images/CompanyLogo/KB손해보험.png',
    'KB손해보험',
    52.37,
    1.7,
    8.54,
    0.94,
    12.89,
    26.77,
    175.8,
    1110.273025,
    3282,
  ),
];

export default function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '1200px',
        height: '300px',
      }}
    >
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#daecff' }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <TableHeadText>보험사명</TableHeadText>
            </TableCell>
            <TableCell>
              <TableHeadText>회사지수</TableHeadText>
            </TableCell>
            <TableCell>
              <TableHeadText>부지급률(%)</TableHeadText>
            </TableCell>
            <TableCell>
              <TableHeadText>
                {'민원청구'}
                <br />
                {'(건, 10만건당)'}
              </TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>평균지급기간(일)</TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>평균지급지연(일)</TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>지급지연율(%) 금액</TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>지급여력비율(%)</TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>부채비율(%)</TableHeadText>
            </TableCell>
            <TableCell align="right">
              <TableHeadText>순자산(십억원)</TableHeadText>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            minWidth: 800,
            width: '1000px',
            overflowX: 'scroll',
            overflowY: 'auto',
            border: '0',
            cellspacing: '0',
            cellpadding: '0',
          }}
        >
          {rows.map(row => (
            <TableRow
              key={row.company_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={row.company_logo}
                  alt={row.company_name}
                  style={{ width: '60px' }}
                />
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.company_name}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.company_index}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.non_payment_rate}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.complaints}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.payment_period}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.delay_period}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.delay_rate}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.capital_ratio}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.debt_ratio}</TableBodyText>
              </TableCell>
              <TableCell align="right">
                <TableBodyText>{row.net_assets}</TableBodyText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

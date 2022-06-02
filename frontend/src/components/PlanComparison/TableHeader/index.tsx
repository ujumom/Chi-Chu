/**
 * 각 회사들의 프로필 행.
 * 상세검색의 회사 프로필을 이용
 * */

import {
  Avatar,
  Container,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
import { PlanPickerType } from '../../../types/types';
import {
  AvatarDiv,
  Profile,
  ProfileName,
} from '../../PlanDetail/CompanyProfile/styles';

type TableHeaderType = {
  companies: PlanPickerType[];
};

function TableHeader({ companies }: TableHeaderType) {
  return (
    <TableRow>
      <TableCell></TableCell>
      {companies.map(company => (
        <TableCell sx={{ justifyContent: 'center' }} key={company.product_code}>
          {/* 회사들 프로필 부분 */}
          <Container sx={{ textAlign: 'left', height: '5rem' }}>
            <Profile>
              <AvatarDiv>
                <Avatar
                  src={`/images/CompanyLogo/${company.company_name}.png`}
                  alt={company.company_name}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                />
              </AvatarDiv>

              <ProfileName>
                <Typography
                  sx={{
                    fontFamily: 'NotoSansKRMedium',
                    fontSize: '16px',
                    color: 'black',
                  }}
                >
                  {company.company_name}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'NotoSansKRLight',
                    fontSize: '15px',
                    color: 'black',
                  }}
                >
                  {company.product_name}
                </Typography>
              </ProfileName>
            </Profile>
          </Container>
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableHeader;

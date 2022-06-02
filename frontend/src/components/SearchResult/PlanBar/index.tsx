import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { PlanPickerType, ProductType } from '../../../types/types';
import { PlanCardBottomText, PlanCardLabel } from '../PlanCard/styles';

function PlanBar({ content }: { content: ProductType }) {
  const planInfo: PlanPickerType = { ...content };
  const { CheckBoxLinked, updateCheckedPlanList, isEmptyList } =
    useCheckBoxLinked();

  return (
    <Card
      sx={{ borderRadius: '10px', boxShadow: 'rgb(0 0 0 / 10%) 2px 2px 20px' }}
    >
      <CardActionArea>
        <Link
          to={`./${content.product_code}`}
          state={{ product_code: content.product_code, py: content.py }}
          onClick={e => {
            if (!isEmptyList()) {
              updateCheckedPlanList(e, planInfo);
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={`/images/CompanyLogo/${content.company_name}.png`}
                alt={content.company_name}
                variant="rounded"
                sx={{ width: 56, height: 56 }}
              />
            }
            // title={content.company_name}
            title={
              <Typography
                sx={{
                  fontFamily: 'NotoSansKRMedium',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                {content.company_name}
              </Typography>
            }
            // subheader={content.product_name}
            subheader={
              <Typography
                sx={{
                  fontFamily: 'NotoSansKRLight',
                  fontSize: '15px',
                  color: 'black',
                }}
              >
                {content.product_name}
              </Typography>
            }
            action={<CheckBoxLinked prop={planInfo} />}
          />
          <CardContent>
            <Stack direction="row" justifyContent="space-between" paddingX={7}>
              <Stack direction="row" spacing={4}>
                <Stack direction="column">
                  <PlanCardLabel>설계 유형</PlanCardLabel>
                  <PlanCardBottomText>
                    {content.subtype_code == 1
                      ? '실속형'
                      : content.subtype_code == 2
                      ? '표준형'
                      : '고급형'}
                  </PlanCardBottomText>
                </Stack>
                <Stack direction="column">
                  <PlanCardLabel>보험료</PlanCardLabel>
                  <PlanCardBottomText>
                    {'월 ' + content.rate.toLocaleString() + '원'}
                  </PlanCardBottomText>
                </Stack>
              </Stack>
              <Box sx={{ width: '33%' }}>
                <ProgressBarWithNumber plan_score={content.total_index} />
              </Box>
            </Stack>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default PlanBar;

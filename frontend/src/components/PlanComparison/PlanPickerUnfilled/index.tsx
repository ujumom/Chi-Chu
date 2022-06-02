import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import CompanyProfile from '../../PlanDetail/CompanyProfile';
import {
  AvatarDiv,
  Profile,
  ProfileName,
} from '../../PlanDetail/CompanyProfile/styles';

function PlanPickerUnfilled({
  maxNum,
  curNum,
}: {
  maxNum: number;
  curNum: number;
}) {
  return (
    <>
      {Array.from(Array(maxNum - curNum).keys()).map(value => (
        <Grid item sm={12} md={4} key={value}>
          <Paper
            elevation={3}
            sx={{
              width: '18rem',
              height: '7.5rem',
              boxShadow: 'rgb(0 0 0 / 10%) 2px 2px 20px',
              borderRadius: '15px',
            }}
          >
            {/* <CompanyProfile
              company_name={''}
              product_name={'상품은 2 ~ 3개까지 비교 가능합니다.'}
            /> */}
            <Container sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'NotoSansKRMedium',
                  fontSize: '16px',
                  color: 'black',
                  paddingTop: 4,
                }}
              >
                상품은 2 ~ 3개까지
                <br />
                비교할 수 있어요!
              </Typography>
            </Container>
          </Paper>
        </Grid>
      ))}
    </>
  );
}

export default PlanPickerUnfilled;

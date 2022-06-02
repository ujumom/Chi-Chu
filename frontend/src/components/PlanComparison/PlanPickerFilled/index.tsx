import {
  IconButton,
  Grid,
  Paper,
  Avatar,
  Container,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompanyProfile from '../../PlanDetail/CompanyProfile';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { PlanPickerType } from '../../../types/types';
import {
  AvatarDiv,
  Profile,
  ProfileName,
} from '../../PlanDetail/CompanyProfile/styles';

function PlanPickerFilled({ list }: { list: PlanPickerType[] }) {
  const { removePlan } = useCheckBoxLinked();

  return (
    <>
      {list.map(item => (
        <Grid item sm={12} md={4} key={item.product_code}>
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
              company_name={item.company_name}
              product_name={item.product_name}
            /> */}
            <Container sx={{ textAlign: 'left', height: '5rem' }}>
              <Profile>
                <AvatarDiv>
                  <Avatar
                    src={`/images/CompanyLogo/${item.company_name}.png`}
                    alt={item.company_name}
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
                    {item.company_name}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'NotoSansKRLight',
                      fontSize: '15px',
                      color: 'black',
                    }}
                  >
                    {item.product_name}
                  </Typography>
                </ProfileName>
              </Profile>
            </Container>
            <IconButton
              onClick={() => {
                if (item.setChecked) {
                  item.setChecked(false);
                  removePlan(item.product_code);
                }
              }}
              sx={{ padding: 0, paddingTop: 1 }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Paper>
          {/* 누르면 비교 목록에서 삭제 */}
        </Grid>
      ))}
    </>
  );
}

export default PlanPickerFilled;

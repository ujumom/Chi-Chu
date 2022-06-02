import { Avatar } from '@mui/material';

import {
  Container,
  Profile,
  AvatarDiv,
  ProfileName,
  CompanyName,
  ProductName,
} from './styles';

export type CompanyProfileType = {
  company_name: string;
  product_name: string;
};

function CompanyProfile(props: CompanyProfileType) {
  console.log(props.company_name);
  return (
    <Container>
      <Profile>
        <AvatarDiv>
          <Avatar
            src={`/images/CompanyLogo/${props.company_name}.png`}
            alt={props.company_name}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          />
        </AvatarDiv>
        <ProfileName>
          <CompanyName>{props.company_name}</CompanyName>
          <ProductName>{props.product_name}</ProductName>
        </ProfileName>
      </Profile>
    </Container>
  );
}

export default CompanyProfile;

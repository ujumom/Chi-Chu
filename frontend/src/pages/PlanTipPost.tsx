import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { One } from '../components/PlanTip/PostCarousel/PostPages/One';
import { Three } from '../components/PlanTip/PostCarousel/PostPages/Three';
import { Two } from '../components/PlanTip/PostCarousel/PostPages/Two';
import Header from '../components/Common/Header';

interface CustomState {
  state: {
    articlenum: number;
  };
}

function PlanTipPost() {
  const location = useLocation();
  const state = location.state as CustomState;

  return (
    <>
      <Header />
      <Container sx={{ textAlign: 'center' }}>
        <>
          {state['articlenum'] === 1 ? <One /> : null}
          {state['articlenum'] === 2 ? <Two /> : null}
          {state['articlenum'] === 3 ? <Three /> : null}
        </>
      </Container>
    </>
  );
}

export default PlanTipPost;

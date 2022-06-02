import { Grid } from '@mui/material';

import Card from '../PlanCard';
import { ProductType } from '../../../types/types';

function PlanCardList({ list }: { list: ProductType[] }) {
  return (
    <Grid container spacing={2}>
      {list.map(content => (
        <Grid item xs={12} sm={4} key={content.product_code}>
          <Card content={content} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PlanCardList;

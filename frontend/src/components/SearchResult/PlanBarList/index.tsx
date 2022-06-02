import { Stack } from '@mui/material';

import PlanBar from '../PlanBar';
import { ProductType } from '../../../types/types';

function PlanBarList({ list }: { list: ProductType[] }): JSX.Element {
  return (
    <Stack direction="column" spacing={2}>
      {list.map(content => (
        <PlanBar content={content} key={content.product_code} />
      ))}
    </Stack>
  );
}

export default PlanBarList;

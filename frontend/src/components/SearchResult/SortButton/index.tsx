import React from 'react';
import { useRecoilState } from 'recoil';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { sortByState } from '../../../recoil/searchResultState';
import { NormalRegularText } from '../../PlanDetail/styles';

function SortButton() {
  const [sortBy, setSortBy] = useRecoilState(sortByState);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: string,
  ) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={sortBy}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="chichu">
        <NormalRegularText style={{ margin: '0px' }}>
          치츄지수순
        </NormalRegularText>
      </ToggleButton>
      <ToggleButton value="cheap">
        <NormalRegularText style={{ margin: '0px' }}>
          보험료 낮은순
        </NormalRegularText>
      </ToggleButton>
      <ToggleButton value="coverage">
        <NormalRegularText style={{ margin: '0px' }}>
          보장 많은순
        </NormalRegularText>{' '}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SortButton;

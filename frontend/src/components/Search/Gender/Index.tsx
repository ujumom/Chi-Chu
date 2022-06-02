import React from 'react';
import { useRecoilState } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import {
  InputLabel,
  StyledButton,
  StyledListbox,
  StyledOption,
  StyledPopper,
} from './styles';

import SelectUnstyled, {
  SelectUnstyledProps,
  SelectOption,
} from '@mui/base/SelectUnstyled';

function CustomSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

function renderValue(option: SelectOption<number> | null) {
  // console.log(option);
  if (option == null) {
    return <span>선택해주세요.</span>;
  }

  return <span>{option.label}</span>;
}

function Gender() {
  const [userGender, setUserGender] = useRecoilState(UserGender);
  const handleChange = (e: number | null) => {
    setUserGender(e);
  };

  return (
    // <CustomSelect renderValue={renderValue} onChange={handleChange}>
    //   <StyledOption value={1}>남성</StyledOption>
    //   <StyledOption value={2}>여성</StyledOption>
    // </CustomSelect>
    <>
      <InputLabel>성별</InputLabel>
      <CustomSelect
        value={userGender}
        renderValue={renderValue}
        onChange={handleChange}
      >
        <StyledOption value={1}>남성</StyledOption>
        <StyledOption value={2}>여성</StyledOption>
      </CustomSelect>
    </>
  );
}
export default Gender;

import React from 'react';
import { Box } from '@mui/system';
import { StyledModal } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CHICHUModal from '../../../Common/CHICHUModal';
import { UserIndexText } from './UserIndexText';
import ShortModal from '../ShortModal';

export default function UserIndexModal() {
  return (
    <>
      <ShortModal
        element={<UserIndexText />}
        icon={<HelpOutlineIcon fontSize="small" sx={{ cursor: 'pointer' }} />}
      ></ShortModal>
    </>
  );
}

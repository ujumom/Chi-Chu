import React from 'react';
import { Box } from '@mui/system';
import { StyledModal } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CHICHUModal from '../../../Common/CHICHUModal';
import { ProductIndexText } from './ProductIndexText';
import ShortModal from '../ShortModal';

export default function ProductIndexModal() {
  return (
    <>
      <ShortModal
        element={<ProductIndexText />}
        icon={<HelpOutlineIcon fontSize="small" sx={{ cursor: 'pointer' }} />}
      ></ShortModal>
    </>
  );
}

import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LongModal from '../LongModal';
import CompanyIndexText from './CompanyIndextext';

export default function CompanyIndexModal() {
  return (
    <>
      <LongModal
        element={<CompanyIndexText />}
        icon={<HelpOutlineIcon fontSize="small" sx={{ cursor: 'pointer' }} />}
      ></LongModal>
    </>
  );
}

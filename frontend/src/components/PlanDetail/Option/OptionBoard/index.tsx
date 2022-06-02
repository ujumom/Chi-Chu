import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LongModal from '../../Modal/LongModal';
import { BochulText } from './OptionGuides/BochulText';
import { DL, DT, DD_RIGHT, DD_LEFT, JisuText } from '../styles';
import { BozonText } from './OptionGuides/BozonText';
import { SingyeongText } from './OptionGuides/SingyeongText';
import { ETC } from './OptionGuides/ETC';
import { Box } from '@mui/material';
import { NormalRegularText, HorizontalLine } from '../../styles';
import { borderBottom } from '@mui/system';
import ShortModal from '../../Modal/ShortModal';

type PropType = {
  option: {
    NAME: string;
    COVERAGE: number;
  }[];
};

export function OptionBoard(props: PropType) {
  let implant = 0;
  let teulni = 0;
  let bridge = 0;

  let legin = 0;
  let crown = 0;
  let amalgam = 0;

  let singyeong = 0;

  let itmom = 0;
  let chizogol = 0;
  let scaling = 0;
  let goljeol = 0;
  let x_ray = 0;

  for (const item of props.option) {
    if (item['NAME'] == '레진') {
      legin = item['COVERAGE'];
    } else if (item['NAME'] == '크라운') {
      crown = item['COVERAGE'];
    } else if (item['NAME'] == '아말감') {
      amalgam = item['COVERAGE'];
    } else if (item['NAME'] == '임플란트') {
      implant = item['COVERAGE'];
    } else if (item['NAME'] == '틀니') {
      teulni = item['COVERAGE'];
    } else if (item['NAME'] == '브릿지') {
      bridge = item['COVERAGE'];
    } else if (item['NAME'] == '신경치료') {
      singyeong = item['COVERAGE'];
    } else if (item['NAME'] == '잇몸질환') {
      itmom = item['COVERAGE'];
    } else if (item['NAME'] == '치조골 이식수술') {
      chizogol = item['COVERAGE'];
    } else if (item['NAME'] == '스케일링') {
      scaling = item['COVERAGE'];
    } else if (item['NAME'] == '치아골절 진단비') {
      goljeol = item['COVERAGE'];
    } else if (item['NAME'] == 'X-RAY 촬영') {
      x_ray = item['COVERAGE'];
    }
  }

  return (
    <>
      <Box>
        <NormalRegularText
          style={{
            color: 'grey',
            marginBottom: '0px',
            marginTop: '50px',
            textAlign: 'left',
          }}
        >
          보험보장내역
        </NormalRegularText>
        <br />
        <DT>
          <JisuText>치아보철치료</JisuText>
          <LongModal
            element={<BochulText />}
            icon={
              <HelpOutlineIcon
                fontSize="small"
                sx={{ cursor: 'pointer', marginTop: '5px' }}
              />
            }
          />
        </DT>
        <table style={{ width: '100%' }}>
          <tr style={{ borderBottom: '2px grey solid' }}>
            <DD_LEFT>임플란트</DD_LEFT>
            <DD_RIGHT>
              {implant ? `${implant.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>틀니</DD_LEFT>
            <DD_RIGHT>{teulni ? `${teulni.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>브릿지</DD_LEFT>
            <DD_RIGHT>{bridge ? `${bridge.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
        </table>

        <DT>
          <JisuText>치아보존치료</JisuText>
          <LongModal
            element={<BozonText />}
            icon={
              <HelpOutlineIcon
                fontSize="small"
                sx={{ cursor: 'pointer', marginTop: '5px' }}
              />
            }
          />
        </DT>
        <table style={{ width: '100%', borderBottom: '1px grey' }}>
          <tr>
            <DD_LEFT>크라운</DD_LEFT>
            <DD_RIGHT>{crown ? `${crown.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>아말감</DD_LEFT>
            <DD_RIGHT>
              {amalgam ? `${amalgam.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>레진</DD_LEFT>
            <DD_RIGHT>{legin ? `${legin.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
        </table>
        <DT>
          <JisuText>신경치료</JisuText>
          <ShortModal
            element={<SingyeongText />}
            icon={
              <HelpOutlineIcon
                fontSize="small"
                sx={{ cursor: 'pointer', marginTop: '5px' }}
              />
            }
          />
        </DT>
        <table style={{ width: '100%', borderBottom: '1px grey' }}>
          <tr>
            <DD_LEFT>신경치료</DD_LEFT>
            <DD_RIGHT>
              {singyeong ? `${singyeong.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
        </table>

        <DT>
          <JisuText>기타</JisuText>
          <LongModal
            element={<ETC />}
            icon={
              <HelpOutlineIcon
                fontSize="small"
                sx={{ cursor: 'pointer', marginTop: '5px' }}
              />
            }
          />
        </DT>

        <table style={{ width: '100%', borderBottom: '1px grey' }}>
          <tr>
            <DD_LEFT>잇몸질환</DD_LEFT>
            <DD_RIGHT>{itmom ? `${itmom.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>치조골 이식수술</DD_LEFT>
            <DD_RIGHT>
              {chizogol ? `${chizogol.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>스케일링</DD_LEFT>
            <DD_RIGHT>
              {scaling ? `${scaling.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>치아골절 진단비</DD_LEFT>
            <DD_RIGHT>
              {goljeol ? `${goljeol.toLocaleString()}원` : '-'}
            </DD_RIGHT>
          </tr>
          <tr>
            <DD_LEFT>X-RAY 촬영</DD_LEFT>
            <DD_RIGHT>{x_ray ? `${x_ray.toLocaleString()}원` : '-'}</DD_RIGHT>
          </tr>
        </table>
      </Box>
    </>
  );
}

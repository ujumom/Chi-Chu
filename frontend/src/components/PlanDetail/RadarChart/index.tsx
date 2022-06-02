import React from 'react';
import { Container } from './styles';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { GreyRegularText, NormalBoldSpan, NormalBoldText } from '../styles';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type PropType = {
  option_group: {
    NAME: string;
    COVERAGE: number;
    RATE: number;
  }[];
};

const options = {
  plugins: {
    legend: {
      labels: {
        font: {
          size: 15,
          family: 'NotoSansKRRegular',
        },
      },
    },
  },
  scales: {
    r: {
      pointLabels: {
        color: '#1a90ff',
        font: {
          size: 15,
          family: 'NotoSansKRBold',
        },
      },
    },
  },
};

export function RadarChart(props: PropType) {
  const values = Object.values(props);
  const label_arr = [];
  const data_arr = [];
  for (const item of values[0]) {
    label_arr.push(item['NAME']);
    data_arr.push(item['RATE']);
  }
  // 담보 값 없으면 분기처리
  if (values[0].length < 3) {
    if (!label_arr.includes('치아보존치료비')) {
      label_arr.push('치아보존치료비');
      data_arr.push(0);
    }
    if (!label_arr.includes('치아신경치료비')) {
      label_arr.push('치아신경치료비');
      data_arr.push(0);
    }
    if (!label_arr.includes('치아보철치료비')) {
      label_arr.push('치아보철치료비');
      data_arr.push(0);
    }
  }

  const maxNum = Math.max(...data_arr);
  const maxIndex = data_arr.indexOf(maxNum);
  const maxBohum = label_arr[maxIndex];
  console.log(maxBohum);

  const data = {
    labels: label_arr,
    datasets: [
      {
        label: '평균 보장금액 대비 해당 보험의 보장금액',
        data: data_arr,
        backgroundColor: 'rgba(163, 211, 255, 0.2)',
        borderColor: 'rgba(105, 182, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container style={{ marginBottom: '13vh' }}>
      <NormalBoldText>
        이 보험은
        <br />
        <NormalBoldSpan style={{ color: '#1a90ff' }}>{maxBohum}</NormalBoldSpan>
        에 주력하고 있어요!
      </NormalBoldText>
      <Radar
        data={data}
        options={options}
        style={{ marginLeft: '85px', maxHeight: '550px' }}
      />
    </Container>
  );
}

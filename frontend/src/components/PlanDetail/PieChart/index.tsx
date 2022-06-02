import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { Container } from './styles';
import { GreyRegularText, NormalBoldSpan, NormalBoldText } from '../styles';
import { BorderColor } from '@mui/icons-material';

type PropType = {
  age_rate: {
    AGE_CAT: number;
    RATE: number;
  }[];
};

ChartJS.register(ArcElement, Tooltip);
const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 15,
          family: 'NotoSansKRBold',
        },
      },
    },
    datalabels: {
      color: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(109, 244, 71, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      display: true,
      formatter: (val: any, ctx: any) => {
        return ctx.chart.data.labels[ctx.dataIndex];
      },
      font: {
        size: 20,
        family: 'NotoSansKRBold',
      },
    },
  },
};

export function PieChart(props: PropType) {
  const values = Object.values(props);
  const label_arr = [];
  const data_arr = [];

  for (const item of values[0]) {
    label_arr.push(`${item['AGE_CAT']}대`);
    data_arr.push(item['RATE']);
  }

  const maxNum = Math.max(...data_arr);
  const maxIndex = data_arr.indexOf(maxNum);
  const maxAge = label_arr[maxIndex];
  console.log(maxAge);

  const data = {
    labels: label_arr,
    datasets: [
      {
        label: '# of Votes',
        data: data_arr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(154, 215, 137, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(47,192, 5, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <NormalBoldText style={{ marginBottom: '5px' }}>
        이 보험은&nbsp;
        <NormalBoldSpan style={{ color: '#1a90ff' }}>{maxAge}</NormalBoldSpan>가
        <br />
        많이 가입하고 있어요!
      </NormalBoldText>
      <Pie
        data={data}
        plugins={[ChartDataLabels]}
        options={options}
        style={{ marginLeft: '180px', maxWidth: '500px' }}
      />
    </>
  );
}

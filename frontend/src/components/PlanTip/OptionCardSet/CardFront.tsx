import React from 'react';
import CardContent from '@mui/material/CardContent';
import { Symptom } from './styles';

type PropType = {
  symptom: string;
  image: string;
};

function CardFront({ symptom, image }: PropType) {
  return (
    <>
      <CardContent>
        <Symptom>{symptom}</Symptom>
        <img src={image} style={{ maxWidth: '150px', alignItems: 'center' }} />
      </CardContent>
    </>
  );
}

export default CardFront;

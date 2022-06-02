import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type PropType = {
  text1: string;
  text2: string;
  img: string;
  articlenum?: number;
};

export default function CarouselCard(props: PropType) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundImage: `url("${props.img}")`,
      }}
    >
      <CardActionArea
        sx={{
          height: 250,
          width: '100%',
          backgroundColor: 'rgba( 255, 255, 255, 0.6 )',
        }}
        onClick={() => {
          console.log(props.articlenum);
          navigate(`./${props.articlenum}`, {
            state: { articlenum: props.articlenum },
          });
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontFamily: 'NotoSansKRBold', fontSize: 15 }}
            color="#1a90ff"
            gutterBottom
          >
            보험안내서
          </Typography>
          <Typography
            sx={{
              fontFamily: 'NotoSansKRBold',
              fontSize: 35,
              marginBottom: '0px',
            }}
            component="div"
          >
            {props.text1}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'NotoSansKRBold',
              fontSize: 35,
              marginTop: '0px',
            }}
            component="div"
          >
            {props.text2}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CardContent from '@mui/material/CardContent';
import { Description, OptionName, FindText } from './styles';
import { Button } from '@mui/material';
import { UserGender } from '../../../recoil/UserGender';
import { UserAge } from '../../../recoil/UserAge';

type PropType = {
  name: string;
  name2: string | null;
  description: string;
};

// const onClickHandler = () => {
//   navigate('/search/result', { state: { optionName: name } });
// };

function CardBack({ name, name2, description }: PropType) {
  // const [userAge, setUserAge] = useRecoilState(UserAge);
  // const [userGender, setUserGender] = useRecoilState(UserGender);

  return (
    <>
      <CardContent>
        {name2 ? (
          <OptionName>{`<${name}·${name2}>`}</OptionName>
        ) : (
          <OptionName>{`<${name}>`}</OptionName>
        )}
        <Description style={{ marginBottom: '5px' }}>
          <b>-</b>
        </Description>
        <Description>{description}</Description>
        {/* <Button>
          <Link
            to="/search/result"
            state={
              name2 ? { optionName: name, Name_2: name2 } : { optionName: name }
            }
            onClick={() => {
              if (!userAge || !userGender) {
                setUserAge(30);
                setUserGender(1);
              }
            }}
            style={{
              fontSize: '13px',
              fontFamily: 'NotoSansKRLight',
              textDecoration: 'none',
              color: '3399ff',
            }}
          >
            보장해주는 보험 검색하기
          </Link>
        </Button> */}
      </CardContent>
    </>
  );
}

export default CardBack;

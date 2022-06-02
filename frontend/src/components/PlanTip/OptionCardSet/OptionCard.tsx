import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { SceneCard, Box } from './styles';
import CardFront from './CardFront';
import CardBack from './CardBack';

type OptionType = {
  option: {
    name: string;
    name2?: string | null;
    description: string;
    symptom: string;
    image: string;
  };
};

export default function OptionCard({ option }: OptionType) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <Box>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <SceneCard onClick={handleClick}>
          <CardFront symptom={option.symptom} image={option.image} />
        </SceneCard>

        <SceneCard onClick={handleClick}>
          <CardBack
            name={option.name}
            name2={option.name2 ? option.name2 : null}
            description={option.description}
          />
        </SceneCard>
      </ReactCardFlip>
    </Box>
  );
}

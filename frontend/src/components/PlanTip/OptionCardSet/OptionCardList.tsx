import { Container } from './styles';
import OptionCard from './OptionCard';

type PropType = {
  list: {
    name: string;
    name2?: string | null;
    description: string;
    symptom: string;
    image: string;
  }[];
};

function OptionCardList(prop: PropType) {
  return (
    <Container>
      {prop.list.map(option => (
        <div key={option.name}>
          <OptionCard option={option} />
        </div>
      ))}
    </Container>
  );
}

export default OptionCardList;

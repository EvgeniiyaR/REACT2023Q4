import './Cards.css';
import { IArtwork } from '../../types/interfaces';
import Card from '../Card/Card';

interface ICardsProps {
  data: IArtwork[];
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const Cards = ({ data, setId }: ICardsProps) => {
  return (
    <ul className="cards">
      {data.map((item: IArtwork) => (
        <li className="cards__item" key={item.id}>
          <Card item={item} setId={setId} />
        </li>
      ))}
    </ul>
  );
};

export default Cards;

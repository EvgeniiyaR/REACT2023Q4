import './Cards.css';
import { IArtwork } from '../../types/interfaces';
import Card from '../Card/Card';

interface ICardsProps {
  data: IArtwork[];
}

const Cards = ({ data }: ICardsProps) => {
  return (
    <ul className="cards">
      {data.map((item: IArtwork) => (
        <li className="cards__item" key={item.id}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  );
};

export default Cards;

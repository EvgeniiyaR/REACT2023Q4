import { Component } from 'react';
import './Cards.css';
import { IArtwork } from '../../types/interfaces';
import Card from '../Card/Card';

interface ICardsProps {
  data: IArtwork[];
}

class Cards extends Component<ICardsProps> {
  constructor(props: ICardsProps) {
    super(props);
  }

  render() {
    return (
      <ul className="cards">
        {this.props.data.map((item: IArtwork) => (
          <li className="cards__item" key={item.id}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Cards;

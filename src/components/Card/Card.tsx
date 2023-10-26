import { Component } from 'react';
import './Card.css';
import { IArtwork } from '../../types/interfaces';
import notFoundImage from '../../assets/notfound.jpg';

interface ICardProps {
  item: IArtwork;
}

class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <h2 className="card__title">{this.props.item.title}</h2>
        <p className="card__description">
          <img
            className="card__image"
            src={`${
              this.props.item.imageId
                ? `https://www.artic.edu/iiif/2/${this.props.item.imageId}/full/200,/0/default.jpg`
                : notFoundImage
            } `}
            alt={this.props.item.imageId ? this.props.item.title : 'Not found'}
          />
          {this.props.item.description
            ? this.props.item.description.replace(/<[^>]*>/gi, '')
            : 'There is no description'}
        </p>
        <div className="card__container-date-author">
          <p className="card__author">{this.props.item.author}</p>
          <p className="card__date">{this.props.item.date}</p>
        </div>
      </div>
    );
  }
}

export default Card;

import './Card.css';
import { IArtwork } from '../../types/interfaces';
import notFoundImage from '../../assets/notfound.jpg';

interface ICardProps {
  item: IArtwork;
}

const Card = ({ item }: ICardProps) => {
  const { title, imageId, description, author, date } = item;

  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <p className="card__description">
        <img
          className="card__image"
          src={`${
            imageId
              ? `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`
              : notFoundImage
          } `}
          alt={imageId ? title : 'Not found'}
        />
        {description
          ? description.replace(/<[^>]*>/gi, '')
          : 'There is no description'}
      </p>
      <div className="card__container-date-author">
        <p className="card__author">{author}</p>
        <p className="card__date">{date}</p>
      </div>
    </div>
  );
};

export default Card;

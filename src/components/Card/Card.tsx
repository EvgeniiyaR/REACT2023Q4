import { useSearchParams } from 'react-router-dom';
import './Card.css';
import { IArtwork } from '../../types/interfaces';
import notFoundImage from '../../assets/notfound.jpg';

interface ICardProps {
  item: IArtwork;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const Card = ({ item, setId }: ICardProps) => {
  const { id, title, imageId, description, author, date } = item;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
    setId(id.toString());
  };

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
      <button className="card__button" type="button" onClick={handleClick}>
        More...
      </button>
    </div>
  );
};

export default Card;

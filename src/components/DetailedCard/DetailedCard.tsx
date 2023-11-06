import './DetailedCard.css';
import notFoundImage from '../../assets/notfound.jpg';
import { IArtwork } from '../../types/interfaces';
import Loader from '../Loader/Loader';
import { MouseEventHandler } from 'react';

interface DetailedCardProps {
  isOpen: boolean;
  handleClose: () => void;
  card: IArtwork;
  isLoading: boolean;
}

const DetailedCard = ({
  isOpen,
  handleClose,
  card,
  isLoading,
}: DetailedCardProps) => {
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
    handleClose();
  };

  return (
    <div
      className={`detailed-card ${isOpen ? 'detailed-card_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`detailed-card__container ${
          isLoading ? 'detailed-card__container_loading' : ''
        }`}
      >
        {!isLoading ? (
          <>
            <button
              className="detailed-card__button"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <h1>{card.title}</h1>
            <img
              className="detailed-card__image"
              src={`${
                card.imageId
                  ? `https://www.artic.edu/iiif/2/${card.imageId}/full/200,/0/default.jpg`
                  : notFoundImage
              } `}
              alt={card.imageId ? card.title : 'Not found'}
            />
            <p className="detailed-card__description">
              {' '}
              {card.description
                ? card.description.replace(/<[^>]*>/gi, '')
                : 'There is no description'}
            </p>
            <div className="detailed-card__container-date-author">
              <p className="detailed-card__author">{card.author}</p>
              <p className="detailed-card__date">{card.date}</p>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailedCard;

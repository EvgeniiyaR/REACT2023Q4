import './DetailedCard.css';
import notFoundImage from '../../assets/notfound.jpg';
import { IArtwork } from '../../types/interfaces';
import Loader from '../Loader/Loader';
import { MouseEventHandler } from 'react';
import { useOutletContext } from 'react-router-dom';

interface DetailedCardProps {
  isOpen?: boolean;
  handleClose?: () => void;
  card?: IArtwork;
  isLoadingDetailedPage?: boolean;
}

const DetailedCard = () => {
  const {
    handleClose,
    isLoadingDetailedPage,
    isOpen,
    card,
  }: DetailedCardProps = useOutletContext();

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <div
      className={`detailed-card ${isOpen ? 'detailed-card_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`detailed-card__container ${
          isLoadingDetailedPage ? 'detailed-card__container_loading' : ''
        }`}
      >
        {!isLoadingDetailedPage ? (
          <>
            <button
              className="detailed-card__button"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <h1>{card && card.title}</h1>
            <img
              className="detailed-card__image"
              src={`${
                card && card.imageId
                  ? `https://www.artic.edu/iiif/2/${card.imageId}/full/200,/0/default.jpg`
                  : notFoundImage
              } `}
              alt={card && card.imageId ? card.title : 'Not found'}
            />
            <p className="detailed-card__description">
              {' '}
              {card && card.description
                ? card.description.replace(/<[^>]*>/gi, '')
                : 'There is no description'}
            </p>
            <div className="detailed-card__container-date-author">
              <p className="detailed-card__author">{card && card.author}</p>
              <p className="detailed-card__date">{card && card.date}</p>
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

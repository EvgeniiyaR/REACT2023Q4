import './Modal.css';

interface IModalProps {
  message: string;
  onClose: () => void;
}

const Modal = ({ message, onClose }: IModalProps) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Error Occurred</h2>
        <p>{message}</p>
        <button className="modal__button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

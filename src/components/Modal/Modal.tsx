import { Component } from 'react';
import './Modal.css';

interface IModalProps {
  message: string;
  onClose: () => void;
}

class Modal extends Component<IModalProps> {
  render() {
    return (
      <div className="modal">
        <div className="modal__content">
          <h2>Error Occurred</h2>
          <p>{this.props.message}</p>
          <button className="modal__button" onClick={this.props.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;

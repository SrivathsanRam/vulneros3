import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {format, parseISO} from 'date-fns';

interface EventCardProps {
  title: string;
  icon: string;
  proximity: number;
  start_time:string;
  end_time: string;
  languages: {
    Languages: string[];
  };
  description: string;
  onAdd: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, icon, proximity, languages, description, start_time, end_time, onAdd }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(!showModal);
  const handleModalClose = () => setShowModal(!showModal);

  const startDate = parseISO(start_time);
  const endDate = parseISO(end_time);
  const formattedStart = format(startDate, 'd MMM yyyy h:mma');
  const formattedEnd = format(endDate, 'h:mma');

  return (
    <div className="card mb-3" style={{ cursor: 'pointer' }} onClick={handleModalOpen}>
      <div className="card-body d-flex justify-content-between">
        
        <div>
          <h5>{title}</h5>
          <p><strong>Proximity:</strong> {proximity} mins</p>
          <p><strong>Date:</strong> {formattedStart} to {formattedEnd}</p>
        </div>
        <div>
          <img src={icon} alt="event icon" style={{ width: '110px', height: '110px' }} />
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Proximity:</strong> {proximity}</p>
          <p><strong>Languages:</strong> {languages && languages.Languages.join(', ')}</p>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            onAdd();
            handleModalClose();
          }}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventCard;
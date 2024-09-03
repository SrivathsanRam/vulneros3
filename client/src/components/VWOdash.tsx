import { useEffect, useState } from "react";
import EventVCard from "./EventVCard";
import { Form, Button } from 'react-bootstrap';
import MultiRangeSlider from "multi-range-slider-react";

interface Event {

  title: string;
  icon: string;
  proximity: number;
  languages: {
    Languages: string[];
  };
  description: string;
  start_time: string;
  end_time: string;
  location: number;
}


const VWOdash = () => {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    languages: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event = {
      title: formData.title,
      description: formData.description,
      start_time: formData.startDateTime,
      end_time: formData.endDateTime,
      location: Number(formData.location),
      languages: {
        Languages: formData.languages.split(',').map(lang => lang.trim())
      },
      icon: 'https://via.placeholder.com/50', // Placeholder icon
      proximity: Math.floor(Math.random() * 10 + 1) // Random proximity
    };

    setEvents([...events, newEvent]); // Add the new event to the events list
    setFormData({ title: '', description: '', startDateTime: '', endDateTime: '', location: '', languages: '' }); // Clear form
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getallevents')

        if (response.ok) {
          const fetchedEvents = await response.json();
          setEvents(fetchedEvents);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

    return (
      <div className="row">
      <div className="col-4">
        <h3 className="text-center">Events Masterlist</h3>
        <div className="scrollable-container">
          {events.length === 0 ? (
            <p>Loading...</p>
          ) : (
            events.sort((a, b) => a.proximity > b.proximity ? 1 : -1)
            .map((event, index) => (
              <EventVCard
                key={index}
                title={event.title}
                icon={event.icon}
            
                start_time={event.start_time}
                end_time = {event.end_time}
                languages= {event.languages}
                description={event.description}

              />
            ))
          )} 
          </div>
      </div>
      <div className="col-4">
          <h3 className="text-center">Create New Event</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter event title" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3} 
                placeholder="Enter event description" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formStartDateTime">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                name="startDateTime" 
                value={formData.startDateTime} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formEndDateTime">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                name="endDateTime" 
                value={formData.endDateTime} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Enter event location" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLanguages">
              <Form.Label>Languages</Form.Label>
              <Form.Control 
                type="text" 
                name="languages" 
                value={formData.languages} 
                onChange={handleChange} 
                placeholder="Comma-separated (e.g., English, Spanish)" 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Event
            </Button>
          </Form>


          </div>

          <div className="col-4">
          <h3 className="text-center">Create Automated Events</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter event title" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formVulRange">
              <Form.Label>Vulnerability Range</Form.Label>
              <MultiRangeSlider
              min={0}
              max={10}
              step={1}
              minValue={minValue}
              maxValue={maxValue}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3} 
                placeholder="Enter event description" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formStartDateTime">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                name="startDateTime" 
                value={formData.startDateTime} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formEndDateTime">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control 
                type="datetime-local" 
                name="endDateTime" 
                value={formData.endDateTime} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Enter event location" 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLanguages">
              <Form.Label>Languages</Form.Label>
              <Form.Control 
                type="text" 
                name="languages" 
                value={formData.languages} 
                onChange={handleChange} 
                placeholder="Comma-separated (e.g., English, Spanish)" 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Event
            </Button>
          </Form>


          </div>
      </div>
    );
  };
  
  export default VWOdash;
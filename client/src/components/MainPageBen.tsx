import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./MainPageBen.css"
import BenEventCard from './BenEventCard';
import { format, parseISO } from 'date-fns';
import ProgBar from './ProgBar';
import BenReqEvent from './BenReqEvent';

type Beneficiary = {
  nric: string,
  name: string,
  sex: string,
  dob: string,
  address: number,
  languages: string[],
  vul_score: number,
  mobility: string,
  preferences: string[],

}

interface Event {
  uuid: string;
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

const MainPageBen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const beneficiary: Beneficiary = location.state.beneficiary;
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!beneficiary.languages || !beneficiary.mobility) {
      navigate('/select-languages', { state: { nric: beneficiary.nric } });
    }
  }, [beneficiary, navigate]);
  console.log(JSON.stringify(beneficiary))

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getbenevents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"mobility":beneficiary.mobility,"address":beneficiary.address,"languages":beneficiary.languages}),
        });

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
  }, [beneficiary.address, beneficiary.languages, beneficiary.mobility]); 


  const handleAddEvent = async (event: Event) => {
   
    setSelectedEvents([...selectedEvents, event]);
    setEvents(events.filter((e) => e.uuid !== event.uuid));
  }

  const handleRemoveEvent = async (event: Event) => {
    setSelectedEvents(selectedEvents.filter((e) => e.uuid !== event.uuid));
    setEvents([...events, event]);
  }

  const handleReqEvent = async (newEvent: Event) => {
    // Set the new event along with the previously selected events
    setSelectedEvents([...selectedEvents, newEvent]);
    console.log("HELLO" + JSON.stringify(selectedEvents));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h3 className="text-center mt-3">Welcome, {beneficiary.name}!</h3>
          <p className="text-center mt-3">Your Vulnerability Score:</p>
          <ProgBar progress={beneficiary.vul_score} height={30}/>
          <div className='mt-2'>
          <BenReqEvent languages={beneficiary.languages} address={beneficiary.address} vul_score={beneficiary.vul_score} onEventCreated={handleReqEvent} />
          </div>
        </div>

        <div className="col-5">
        <h2 className="mb-4 mt-4 text-center">Available Events</h2>
        <div className="scrollable-container">
          {events.length === 0 ? (
            <p>Loading...</p>
          ) : (
            events.map((event, index) => (
              <BenEventCard
                key={index}
                title={event.title}
                icon={event.icon}
                proximity={event.proximity}
                start_time={event.start_time}
                end_time = {event.end_time}
                languages= {event.languages}
                description={event.description}
                onAdd={() => handleAddEvent(event)}
              />
            ))
          )} 
          </div>
        </div>
        <div className="col-4">
        <h2 className="text-center mt-4 mb-4">Selected Events</h2>
        {selectedEvents.length === 0 ? (
            <p>No events selected yet.</p>
          ) : (
            <ul className="list-group">
              {selectedEvents.flat().map((event, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{event.title}</strong> - {format(parseISO(event.start_time),"d MMM yyyy h:mma")} to {format(parseISO(event.end_time),"h:mma")}
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveEvent(event)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageBen;
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ScheduleSelector from 'react-timeslot-selector'
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./MainPageVol.css"
import {format, parseISO} from 'date-fns';

type Volunteer = {
  nric: string;
  name: string;
  address: number;
  certifications: Record<string, string>;
  languages: string[]
};

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

const MainPageVol = () => {
  const [schedule, setSchedule] = useState<Date[]>([]);
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const volunteer: Volunteer = location.state.volunteer;
  console.log("volunteer"+ JSON.stringify(volunteer))
  //console.log(schedule);
  const handleChange = (newSchedule: Date[]) => {
    setSchedule(newSchedule);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getvolevents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"certifications":volunteer.certifications, "languages":volunteer.languages,"address":volunteer.address}),
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
  }, [volunteer.address, volunteer.certifications, volunteer.languages]); 
  
  /*Add Event*/
  const handleAddEvent = async (event: Event) => {
    const updatedEvent = {
      ...event,
      languages: {
        Languages: Array.from(new Set([...event.languages.Languages, ...volunteer.languages])),
      }
    };
    
    setSelectedEvents([...selectedEvents, updatedEvent]);
    setEvents(events.filter((e) => e.uuid !== event.uuid));
    try {
      const response = await fetch('/api/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.error('Failed to add event to backend.');
      } else {
        console.log('Event successfully added to backend.');
      }
    } catch (error) {
      console.error('Error while adding event:', error);
    }
  };

  /*Remove Event*/
  const handleRemoveEvent = async (event: Event) => {
    setSelectedEvents(selectedEvents.filter((e) => e.uuid !== event.uuid));
    setEvents([...events, event]);

    try {
      const response = await fetch('/api/deleteevent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: event.title }),
      });

      if (!response.ok) {
        console.error('Failed to delete event from backend.');
      } else {
        console.log('Event successfully deleted from backend.');
      }
    } catch (error) {
      console.error('Error while deleting event:', error);
    }
  };
  console.log(events);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h4 className="text-center mt-4">Welcome, {volunteer.name}!</h4>
          <ScheduleSelector
            selection={schedule}
            numDays={5}
            minTime={7}
            maxTime={22}
            onChange={handleChange}
          />
        </div>

        
        <div className="col-5">
        <h2 className="mb-4 mt-4 text-center">Available Events</h2>
        <div className="scrollable-container">
          {events.length === 0 ? (
            <p>Loading...</p>
          ) : (
            events.sort((a, b) => a.proximity > b.proximity ? 1 : -1)
            .map((event, index) => (
              (schedule.some((dateTime: string | number | Date) => new Date(dateTime).getTime() === new Date(event.start_time).getTime())) &&
              <EventCard
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
              {selectedEvents.map((event, index) => (
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

export default MainPageVol;

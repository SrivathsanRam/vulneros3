import { useState } from "react";

interface BenReqEventProps{
    languages: string[];
    address: number;
    vul_score: number;
    onEventCreated: (arg0: Event) => void;
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

const BenReqEvent: React.FC<BenReqEventProps> = ({languages, address, vul_score, onEventCreated}) => {
    const [description, setDescription] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/reqevent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'title':'Home Visit','start_time':startTime,'end_time':endTime, 'icon':'housevisit.jpg','location':address,'description':description,'prerequisites':{"Languages": [],"Certifications": []},'languages':{"Languages":languages},'vul_score':vul_score}),
            });
            console.log(response)
            if (!response.ok) {
              console.error('Failed to add event to backend.');
            } else {
              const createdEvent = await response.json();
              // Call the parent's callback with the newly created event
              onEventCreated(createdEvent.data);
              console.log('Event successfully added to backend.');
            }
          } catch (error) {
            console.error('Error while adding event:', error);
          }
        };
    
        
    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
          <h5>Request for Home Visit</h5>
          <div className="mb-1">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </div>
    
          <div className="mb-1">
            <label className="form-label">Start Time:</label>
            <input
              className="form-control"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
    
          <div className="mb-1">
            <label className="form-label">End Time:</label>
            <input
              className="form-control"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
    
          <button type="submit">Create Event</button>
        </form>
      );
    
}

export default BenReqEvent
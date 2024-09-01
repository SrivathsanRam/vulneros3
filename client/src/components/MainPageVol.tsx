import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ScheduleSelector from 'react-timeslot-selector'
import { useState } from "react";

type Volunteer = {
  nric: string;
  name: string;
  address: number;
  certifications: Record<string, string>;
  languages: string[];
};

const MainPageVol = () => {
  const [schedule, setSchedule] = useState<Date[]>([]);
  const location = useLocation();
  const volunteer: Volunteer = location.state.volunteer;

  const handleChange = (newSchedule: Date[]) => {
    setSchedule(newSchedule);
  };

  const renderSelectedSchedule = () => {
    if (schedule.length === 0) {
      return <p>No time slots selected</p>;
    }

    return (
      <ul>
        {schedule.map((time, index) => (
          <li key={index}>{time.toLocaleString()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h1>Welcome, {volunteer.name}!</h1>
          <ScheduleSelector
            selection={schedule}
            numDays={5}
            minTime={7}
            maxTime={22}
            onChange={handleChange}
          />
        </div>
        <div className="col5">
          {JSON.stringify(schedule)}
          
        </div>
      </div>
    </div>
  );
};

export default MainPageVol;

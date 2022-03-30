import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "./Availability.css";
import "./TimePicker.css";

const Availability = () => {
  const [timeRange, setTimeRange] = useState([]);

  let date = new Date();
  let firstDay = new Date(date.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  let noOfDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  let weekNo = Math.ceil((date.getDay() + 1 + noOfDays) / 7);

  let dayNo = date.getDay();

  const handleSubmit = () => {
    console.log(weekNo);
    console.log(timeRange);
  };

  const handleChecked = () => {};

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="container">
        Availability
        <h2>Set Your Available Time</h2>
        <div className="input-container">
          <div className="row">
            <input
              type="checkbox"
              name="sunday"
              id="days"
              disabled={dayNo > 0}
            />
            <label htmlFor="sunday">SUN</label>
            {dayNo > 0 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="monday"
              id="days"
              disabled={dayNo > 1}
            />
            <label htmlFor="monday">MON</label>
            {dayNo > 1 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="tuesday"
              id="days"
              disabled={dayNo > 2}
            />
            <label htmlFor="tuesday">TUE</label>
            {dayNo > 2 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="wednesday"
              id="days"
              disabled={dayNo > 3}
              onClick={handleChecked}
            />
            <label htmlFor="wednesday">WED</label>
            {dayNo > 3 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                onChange={(value) => setTimeRange(value)}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="thursday"
              id="days"
              disabled={dayNo > 4}
            />
            <label htmlFor="thursday">THU</label>
            {dayNo > 4 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="friday"
              id="days"
              disabled={dayNo > 5}
            />
            <label htmlFor="friday">FRI</label>
            {dayNo > 5 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="saturday"
              id="days"
              disabled={dayNo > 6}
            />
            <label htmlFor="saturday">SAT</label>
            {dayNo > 6 ? (
              <p>Unavailble</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
              />
            )}
          </div>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Availability;

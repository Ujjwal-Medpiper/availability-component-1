import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "./Availability.css";
import "./TimePicker.css";

const Availability = () => {
  const [timeRange, setTimeRange] = useState({
    sunAvail: "",
    monAvail: "",
    tueAvail: "",
    wedAvail: "",
    thuAvail: "",
    friAvail: "",
    satAvail: "",
  });

  let date = new Date();
  let firstDay = new Date(date.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  let noOfDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  let weekNo = Math.ceil((date.getDay() + 1 + noOfDays) / 7);

  let dayNo = date.getDay();

  const handleSubmit = () => {
    console.log(weekNo);
    // console.log(timeRange);
    console.log(timeRange);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    if (checked) {
      console.log(name);
    }
  };

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="container">
        Availability
        <h2>Set Your Weekly Hours</h2>
        <div className="input-container">
          <div className="row">
            <input
              type="checkbox"
              name="sunday"
              id="sunday"
              className="days"
              disabled={dayNo > 0}
              onChange={handleChange}
            />
            <label htmlFor="sunday">SUN</label>
            {dayNo > 0 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                value={timeRange.sunAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="monday"
              id="monday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 1}
            />
            <label htmlFor="monday">MON</label>
            {dayNo > 1 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                value={timeRange.monAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="tuesday"
              id="tuesday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 2}
            />
            <label htmlFor="tuesday">TUE</label>
            {dayNo > 2 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                value={timeRange.tueAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="wednesday"
              id="wednesday"
              className="days"
              disabled={dayNo > 3}
              onChange={handleChange}
            />
            <label htmlFor="wednesday">WED</label>
            {dayNo > 3 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                onChange={(value) =>
                  setTimeRange((prevRange) => ({
                    ...prevRange,
                    wedAvail: value,
                  }))
                }
                value={timeRange.wedAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="thursday"
              id="thursday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 4}
            />
            <label htmlFor="thursday">THU</label>
            {dayNo > 4 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                onChange={(value) =>
                  setTimeRange((prevRange) => ({
                    ...prevRange,
                    thuAvail: value,
                  }))
                }
                value={timeRange.thuAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="friday"
              id="friday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 5}
            />
            <label htmlFor="friday">FRI</label>
            {dayNo > 5 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                onChange={(value) =>
                  setTimeRange((prevRange) => ({
                    ...prevRange,
                    friAvail: value,
                  }))
                }
                value={timeRange.friAvail}
              />
            )}
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="saturday"
              id="saturday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 6}
            />
            <label htmlFor="saturday">SAT</label>
            {dayNo > 6 ? (
              <p>Unavailable</p>
            ) : (
              <TimeRangePicker
                disableClock={true}
                clearIcon={<FaRegTrashAlt />}
                onChange={(value) =>
                  setTimeRange((prevRange) => ({
                    ...prevRange,
                    satAvail: value,
                  }))
                }
                value={timeRange.satAvail}
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

// satAvail: {}
// setAvail: {
// startTime: "",
// endTime: "",
// slotDuration:""
// slots:[{startTime, endTime},{}]
// numberOfSlots:""
// }

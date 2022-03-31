import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "./Availability.css";
import "./TimePicker.css";

const Availability = () => {
  const [timeRange, setTimeRange] = useState({
    sunAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    monAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    tueAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    wedAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    thuAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    friAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    satAvail: {
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
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
    console.log(timeRange);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    if (checked) {
      console.log(name);
    }
  };

  const calculateSlotTime = (start, end) => {
    if (start && end) {
      let hr = (parseInt(end.slice(0, 2)) - parseInt(start.slice(0, 2))) * 60;
      let min = parseInt(end.slice(3)) - parseInt(start.slice(3));
      var total = hr + min;
      return total;
      // return console.log(total);
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
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  value={timeRange.monAvail}
                />
                <select name="slot" id="slotSelect">
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                </select>
              </>
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
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  value={timeRange.tueAvail}
                />
                <select name="slot" id="slotSelect">
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                </select>
              </>
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
                    wedAvail: {
                      ...prevRange.wedAvail,
                      timeRange: value,
                    },
                  }))
                }
                value={timeRange.wedAvail.timeRange}
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
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  onChange={(value) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      thuAvail: {
                        ...prevRange.thuAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }));
                  }}
                  value={timeRange.thuAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.thuAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      thuAvail: {
                        ...prevRange.thuAvail,
                        slotDuration: e.target.value,
                        noOfSlots:
                          prevRange.thuAvail.noOfMinsInTimeRange /
                          e.target.value,
                      },
                    }));
                  }}
                >
                  <option value="">Select Duration</option>
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                </select>
              </>
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
                    friAvail: {
                      ...prevRange.friAvail,
                      timeRange: value,
                    },
                  }))
                }
                value={timeRange.friAvail.timeRange}
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
                    satAvail: {
                      ...prevRange.satAvail,
                      timeRange: value,
                    },
                  }))
                }
                value={timeRange.satAvail.timeRange}
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

import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "./Availability.css";
import "./TimePicker.css";
import { useEffect } from "react";

const Availability = () => {
  const [selected, setSelected] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [timeRange, setTimeRange] = useState({
    sunAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    monAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    tueAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    wedAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    thuAvail: {
      availTime: "",
      slotDuration: "15",
      noOfSlots: "",
      slots: [],
    },
    friAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    satAvail: {
      availTime: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
  });

  useEffect(() => {
    if (
      timeRange.sunAvail.availTime == "" &&
      timeRange.monAvail.availTime == "" &&
      timeRange.tueAvail.availTime == "" &&
      timeRange.wedAvail.availTime == "" &&
      timeRange.thuAvail.availTime == "" &&
      timeRange.friAvail.availTime == "" &&
      timeRange.satAvail.availTime == ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [timeRange]);

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let firstDay = new Date(date.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  let noOfDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  let weekNo = Math.ceil((date.getDay() + 1 + noOfDays) / 7);

  let dayNo = date.getDay();

  let first = date.getDate() - dayNo;
  let last = first + 6;

  let firstWeekDay = new Date(date.setDate(first));
  let lastWeekDay = new Date(date.setDate(last));

  let weekFirstDate =
    firstWeekDay.getDate() +
    "/" +
    firstWeekDay.getMonth() +
    "/" +
    firstWeekDay.getFullYear();

  let weekLastDate =
    lastWeekDay.getDate() +
    "/" +
    lastWeekDay.getMonth() +
    "/" +
    lastWeekDay.getFullYear();

  const handleSubmit = () => {
    console.log(weekNo);
    // console.log(timeRange);
    console.log(timeRange);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    if (!checked) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  };

  const slotTime = (start, end) => {
    if (start && end) {
      let hr = (parseInt(end.slice(0, 2)) - parseInt(start.slice(0, 2))) * 60;
      let min = parseInt(end.slice(3)) - parseInt(start.slice(3));
      var total = hr + min;
      // return total;
      return console.log(total);
    }
  };

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="container">
        Availability
        <h2>
          Set Your Weekly Hours from {weekFirstDate} to {weekLastDate}
        </h2>
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
            {dayNo > 1 || !selected ? (
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
                      availTime: value,
                    },
                  }))
                }
                value={timeRange.wedAvail.availTime}
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
            {dayNo > 4 || !selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  required={true}
                  onChange={(value) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      thuAvail: {
                        ...prevRange.thuAvail,
                        availTime: value,
                      },
                    }));
                    slotTime(value[0], value[1]);
                  }}
                  value={timeRange.thuAvail.availTime}
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
              name="friday"
              id="friday"
              className="days"
              onChange={handleChange}
              disabled={dayNo > 5}
            />
            <label htmlFor="friday">FRI</label>
            {dayNo > 5 || !selected ? (
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
                      availTime: value,
                    },
                  }))
                }
                value={timeRange.friAvail.availTime}
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
                      availTime: value,
                    },
                  }))
                }
                value={timeRange.satAvail.availTime}
              />
            )}
          </div>
          <input
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Availability;

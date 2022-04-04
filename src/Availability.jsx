import React, { useState } from "react";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "./Availability.css";
import "./TimePicker.css";

const Availability = () => {
  const [pickerList, setPickerList] = useState([]);
  const [timeRange, setTimeRange] = useState({
    sunAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    monAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    tueAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    wedAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    thuAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    friAvail: {
      selected: true,
      timeRange: "",
      noOfMinsInTimeRange: "",
      slotDuration: "",
      noOfSlots: "",
      slots: [],
    },
    satAvail: {
      selected: true,
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

  let first = date.getDate() - date.getDay();

  let firstWeekDay = new Date(date.setDate(first));
  let lastWeekDay = new Date(date.setDate(date.getDate() + 6));

  let weekFirstDate =
    firstWeekDay.getDate() +
    "/" +
    (firstWeekDay.getMonth() + 1) +
    "/" +
    firstWeekDay.getFullYear();

  let weekLastDate =
    lastWeekDay.getDate() +
    "/" +
    (lastWeekDay.getMonth() + 1) +
    "/" +
    lastWeekDay.getFullYear();

  const handleSubmit = () => {
    console.log(weekNo);
    console.log(timeRange);
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

  const getTimeSlots = (start, end, slotDuration) => {
    let startTime = moment(start, "HH:mm");
    let endTime = moment(end, "HH:mm");

    let slots = [];

    while (startTime < endTime) {
      let obj = {
        slotStart: startTime.format("HH:mm"),
        slotEnd: startTime.add(slotDuration, "minutes").format("HH:mm"),
      };
      slots.push(obj);
    }
    return slots;
  };

  const addTimePicker = (e) => {
    // let container = document.getElementById("timepicker-container");
    // let picker = <TimeRangePicker value={11} />;
    // container.append(picker);
    setPickerList(
      pickerList.concat(
        <>
          <div className="picker-container">
            <TimeRangePicker
              key={pickerList.length}
              disableClock={true}
              clearIcon={""}
            />
            <FaRegTrashAlt />
          </div>
        </>
      )
    );
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
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      sunAvail: {
                        ...prevState.sunAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      sunAvail: {
                        ...prevState.sunAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
            />
            <label htmlFor="sunday">SUN</label>
            {dayNo > 0 || !timeRange.sunAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={""}
                  onChange={(value) =>
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      sunAvail: {
                        ...prevRange.sunAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }))
                  }
                  value={timeRange.sunAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.sunAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      sunAvail: {
                        ...prevRange.sunAvail,
                        slotDuration: e.target.value,
                        noOfSlots:
                          prevRange.sunAvail.noOfMinsInTimeRange /
                          e.target.value,
                        slots: getTimeSlots(
                          timeRange.sunAvail.timeRange[0],
                          timeRange.sunAvail.timeRange[1],
                          e.target.value
                        ),
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
              name="monday"
              id="monday"
              className="days"
              checked={timeRange.monAvail.selected}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      monAvail: {
                        ...prevState.monAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      monAvail: {
                        ...prevState.monAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
              disabled={dayNo > 1}
            />
            <label htmlFor="monday">MON</label>
            {dayNo > 1 || !timeRange.monAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <div className="time-picker-container">
                  {/* <TimeRangePicker
                    disableClock={true}
                    clearIcon={""}
                    onChange={(value) =>
                      setTimeRange((prevRange) => ({
                        ...prevRange,
                        monAvail: {
                          ...prevRange.monAvail,
                          timeRange: value,
                          noOfMinsInTimeRange: calculateSlotTime(
                            value[0],
                            value[1]
                          ),
                        },
                      }))
                    }
                    value={timeRange.monAvail.timeRange}
                  /> */}
                  {pickerList}
                </div>
                <MdAddCircleOutline onClick={addTimePicker} />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.monAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      monAvail: {
                        ...prevRange.monAvail,
                        slotDuration: e.target.value,
                        noOfSlots:
                          prevRange.monAvail.noOfMinsInTimeRange /
                          e.target.value,
                        slots: getTimeSlots(
                          timeRange.monAvail.timeRange[0],
                          timeRange.monAvail.timeRange[1],
                          e.target.value
                        ),
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
              name="tuesday"
              id="tuesday"
              className="days"
              checked={timeRange.tueAvail.selected}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      tueAvail: {
                        ...prevState.tueAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      tueAvail: {
                        ...prevState.tueAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
              disabled={dayNo > 2}
            />
            <label htmlFor="tuesday">TUE</label>
            {dayNo > 2 || !timeRange.tueAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  onChange={(value) =>
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      tueAvail: {
                        ...prevRange.tueAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }))
                  }
                  value={timeRange.tueAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.tueAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      tueAvail: {
                        ...prevRange.tueAvail,
                        slotDuration: e.target.value,
                        noOfSlots: Math.ceil(
                          prevRange.tueAvail.noOfMinsInTimeRange /
                            e.target.value
                        ),
                        slots: getTimeSlots(
                          timeRange.tueAvail.timeRange[0],
                          timeRange.tueAvail.timeRange[1],
                          e.target.value
                        ),
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
              name="wednesday"
              id="wednesday"
              className="days"
              checked={timeRange.wedAvail.selected}
              disabled={dayNo > 3}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      wedAvail: {
                        ...prevState.wedAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      wedAvail: {
                        ...prevState.wedAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
            />
            <label htmlFor="wednesday">WED</label>
            {dayNo > 3 || !timeRange.wedAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  onChange={(value) =>
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      wedAvail: {
                        ...prevRange.wedAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }))
                  }
                  value={timeRange.wedAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.wedAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      wedAvail: {
                        ...prevRange.wedAvail,
                        slotDuration: e.target.value,
                        noOfSlots:
                          prevRange.wedAvail.noOfMinsInTimeRange /
                          e.target.value,
                        slots: getTimeSlots(
                          timeRange.wedAvail.timeRange[0],
                          timeRange.wedAvail.timeRange[1],
                          e.target.value
                        ),
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
              name="thursday"
              id="thursday"
              className="days"
              checked={timeRange.thuAvail.selected}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      thuAvail: {
                        ...prevState.thuAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      thuAvail: {
                        ...prevState.thuAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
              disabled={dayNo > 4}
            />
            <label htmlFor="thursday">THU</label>
            {dayNo > 4 || !timeRange.thuAvail.selected ? (
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
                        slots: getTimeSlots(
                          timeRange.thuAvail.timeRange[0],
                          timeRange.thuAvail.timeRange[1],
                          e.target.value
                        ),
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
              checked={timeRange.friAvail.selected}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      friAvail: {
                        ...prevState.friAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      friAvail: {
                        ...prevState.friAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
              disabled={dayNo > 5}
            />
            <label htmlFor="friday">FRI</label>
            {dayNo > 5 || !timeRange.friAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  onChange={(value) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      friAvail: {
                        ...prevRange.friAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }));
                  }}
                  value={timeRange.friAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.friAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      friAvail: {
                        ...prevRange.friAvail,
                        slotDuration: e.target.value,
                        noOfSlots: Math.ceil(
                          prevRange.friAvail.noOfMinsInTimeRange /
                            e.target.value
                        ),
                        slots: getTimeSlots(
                          timeRange.friAvail.timeRange[0],
                          timeRange.friAvail.timeRange[1],
                          e.target.value
                        ),
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
              name="saturday"
              id="saturday"
              className="days"
              checked={timeRange.satAvail.selected}
              onChange={(e) => {
                let checked = e.target.checked;
                if (checked) {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      satAvail: {
                        ...prevState.satAvail,
                        selected: true,
                      },
                    };
                  });
                } else {
                  setTimeRange((prevState) => {
                    return {
                      ...prevState,
                      satAvail: {
                        ...prevState.satAvail,
                        selected: false,
                      },
                    };
                  });
                }
              }}
              disabled={dayNo > 6}
            />
            <label htmlFor="saturday">SAT</label>
            {dayNo > 6 || !timeRange.satAvail.selected ? (
              <p>Unavailable</p>
            ) : (
              <>
                <TimeRangePicker
                  disableClock={true}
                  clearIcon={<FaRegTrashAlt />}
                  onChange={(value) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      satAvail: {
                        ...prevRange.satAvail,
                        timeRange: value,
                        noOfMinsInTimeRange: calculateSlotTime(
                          value[0],
                          value[1]
                        ),
                      },
                    }));
                  }}
                  value={timeRange.satAvail.timeRange}
                />
                <select
                  name="slot"
                  id="slotSelect"
                  value={timeRange.satAvail.slotDuration}
                  onChange={(e) => {
                    setTimeRange((prevRange) => ({
                      ...prevRange,
                      satAvail: {
                        ...prevRange.satAvail,
                        slotDuration: e.target.value,
                        noOfSlots: Math.floor(
                          prevRange.satAvail.noOfMinsInTimeRange /
                            e.target.value
                        ),
                        slots: getTimeSlots(
                          timeRange.satAvail.timeRange[0],
                          timeRange.satAvail.timeRange[1],
                          e.target.value
                        ),
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
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Availability;

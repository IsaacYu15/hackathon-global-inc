import React, { useState, useEffect } from "react";
import axios from "axios";

import Event from "../../components/Event.jsx";
import Navbar from "../navbar/Navbar.jsx";
import eventColors from "./eventColors.js";

import "./EventList.css";
import eventLogo from "../../assets/collaboration.png";

const EventList = () => {
  const [unsortedEvents, setUnsortedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [focusedEventId, setFocusedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    axios
      .get("https://api.hackthenorth.com/v3/events")
      .then((response) => {

        setUnsortedEvents(response.data);

        let filteredData = [...response.data];

        if (isLoggedIn === "false") {
          filteredData = filteredData.filter((event) => event.permission === "public");
          console.log("user is not logged in");
        } else {
          console.log("user is logged in");
        }

        if (eventType) {
          filteredData = filteredData.filter(
            (event) => event.event_type === eventType
          );
        }

        if (searchQuery.length > 0) {
          filteredData = filteredData.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        filteredData.sort((a, b) => a.start_time - b.start_time);

        setEvents(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery, eventType]);

  function scrollToEvent(id) {
    const element = document.getElementById(generateEventId(id));

    if (!element) {
      return;
    }

    setFocusedEventId(prevId => (prevId === id ? null : id));

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

  }

  function generateEventId(id) {
    return "event_" + id;
  }

  return (
    <div id="event_list">
      <Navbar />

      <div className="event_container">
        <div className="header_container">
          <div className="header_text">
            <h1 className="event_title">Events</h1>
            <h3 className="event_description">Learn something amazing!</h3>
          </div>

          <img className="event_logo" src={eventLogo}></img>
        </div>

        <div className="filters_container">
          <input
            type="text"
            className="filter_style"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Events..."
          />

          <select className="filter_style" onChange={handleEventTypeChange} value={eventType}>
            <option value="">Show All</option>
            <option value="workshop">Workshop</option>
            <option value="tech_talk">Tech Talk</option>
            <option value="activity">Activity</option>
          </select>
        </div>

        <div className="event_listing">
          {events.map((event, index) => (
            <div className="event_card" key={event.id}>
              <Event
                props={event}
                unsortedEvents={unsortedEvents}
                eventId={generateEventId(event.id)}
                scrollToEvent={scrollToEvent}
                isFocused={focusedEventId === event.id}
                backgroundColor={eventColors[index % eventColors.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;

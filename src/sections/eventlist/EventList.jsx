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
  const [searchString, setSearchString] = useState("");
  const [eventType, setEventType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  {/*creates a unique id which we can use to find any card*/}
  function generateEventId(id) {
    return "event_" + id;
  }

  function scrollToEvent(id) {
    const element = document.getElementById(generateEventId(id));

    if (!element) {
      return;
    }

    {/*if the event we clicked has an open drop down menu, close it*/}
    if (focusedEventId == id) {
      setFocusedEventId(null);
      return;
    }

    setFocusedEventId(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }

  useEffect(() => {
    axios
      .get("https://api.hackthenorth.com/v3/events")
      .then((response) => {
        setUnsortedEvents(response.data);
        
        var loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

        {/*create a shallow copy so we have an unsorted copy of the fetched data to retrieve related events*/}
        let filteredData = [...response.data];

        {/*display on public events if not logged in*/}
        if (!loggedIn) {
          filteredData = filteredData.filter( (event) => event.permission === "public" );
          console.log("user logged in");
        } 
        else{
          console.log("user not logged in");
        }

        {/*filter events by type*/}
        if (eventType) {
          filteredData = filteredData.filter(
            (event) => event.event_type === eventType
          );
        }

        {/*search by name by checking if desired search is substring*/}
        if (searchString.length > 0) {
          filteredData = filteredData.filter((event) =>
            event.name.toLowerCase().includes(searchString.toLowerCase())
          );
        }

        {/* filter by start time */}
        filteredData.sort((a, b) => a.start_time - b.start_time);

        setEvents(filteredData);
        setIsLoggedIn(loggedIn);

        console.log(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchString, eventType]);

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
            value={searchString}
            onChange={handleSearchChange}
            placeholder="Search Events..."
          />

          <select
            className="filter_style"
            onChange={handleEventTypeChange}
            value={eventType}
          >
            <option value="">Show All</option>
            <option value="workshop">Workshop</option>
            <option value="tech_talk">Tech Talk</option>
            <option value="activity">Activity</option>
          </select>
        </div>

        <div className="event_listing">
          {
          events.map((event, index) => (
            <Event
              key={"event_" + event.id}
              props={event}
              unsortedEvents={unsortedEvents}
              eventId={generateEventId(event.id)}
              scrollToEvent={scrollToEvent}
              isFocused={focusedEventId === event.id}
              isLoggedIn={isLoggedIn}
              backgroundColor={eventColors[index % eventColors.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;

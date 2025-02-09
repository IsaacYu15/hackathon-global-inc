import React, { useState, useEffect } from "react";
import Event from "../../components/Event.jsx";
import Navbar from "../navbar/Navbar.jsx";
import axios from "axios";
import "./EventList.css";
import eventColors from "./eventColors.js";

const EventList = () => {
  const [unsortedEvents, setUnsortedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [focusedEventId, setFocusedEventId] = useState(null);

  function scrollToEvent(id) {
    const element = document.getElementById(generateEventId(id));
    console.log(generateEventId(id));
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    element.focus();
    setFocusedEventId(id);
  }

  function generateEventId(id) {
    return "event_" + id;
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    axios
      .get("https://api.hackthenorth.com/v3/events")
      .then((response) => {
        setUnsortedEvents(response.data);

        let filteredData = [...response.data];

        if (isLoggedIn === "false") {
          filteredData = filteredData.filter((x) => x.permission === "public");
          console.log("user is not logged in");
        } else {
          console.log("user is logged in");
        }

        filteredData.sort((a, b) => a.start_time - b.start_time);

        setEvents(filteredData);
        console.log(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="event_list">
      <Navbar />

      <div className="event_container">
        <div className="header_container">
          <h1 className="event_title">Events</h1>
          <h3>
            Learn something amazing from our workshop hosts and connect with
            other hackers!
          </h3>
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

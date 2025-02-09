import React, { useState, useEffect } from "react";
import Event from "../../components/Event.jsx";
import Navbar from "../navbar/Navbar.jsx";
import axios from "axios";
import "./EventList.css";

const EventList = () => {
  const [unsortedEvents, setUnsortedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [focusedEventId, setFocusedEventId] = useState(null); 

  function scrollToEvent(id) {
    const element = document.getElementById(generateEventId(id));
    console.log(generateEventId(id));
    if (!element) 
    {
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

        {/*create a shallow copy of the data for us to freely modify*/}
        let filteredData = [...response.data];
  
        if (!isLoggedIn) {
          filteredData = filteredData.filter((x) => x.permission === "public");
          console.log("user is not logged in");
        } else {
          console.log("user is logged in");
        }
  
        filteredData.sort((a, b) => a.start_time - b.start_time);
  
        setEvents(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  return (
    <div id="event_list">
      <Navbar />

      <div className="header_container">
        <h1 className="event_title">Events</h1>
        <p>
          Learn something amazing from our workshop hosts and connect with other
          hackers!
        </p>
      </div>

      <div className="event_listing">
        {events.map((event) => (
          <div className="event_card" key={event.id}>
            <Event
              props={event}
              unsortedEvents={unsortedEvents}
              eventId={generateEventId(event.id)}
              scrollToEvent={scrollToEvent}
              isFocused={focusedEventId === event.id} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

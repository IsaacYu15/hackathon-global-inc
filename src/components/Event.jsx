import React from "react";
import "./Event.css";

const Event = ({ props, unsortedEvents, eventId, scrollToEvent, isFocused }) => {
  const handleEventClick = (e, relatedEventId) => {
    e.stopPropagation();
    scrollToEvent(relatedEventId);
  };

  return (
    <div
      id={eventId}
      tabIndex="0"
      onClick={() => {
        scrollToEvent(props.id);
      }}
    >
      <div id="event">
        <div className="header">
          <h2 className="header_title">{props.name}</h2>
          <div className="event_row_container">
            <h4>{props.event_type}</h4>
            <h4>start time: {props.start_time}</h4>
            <h4>end time: {props.end_time}</h4>
          </div>
        </div>

        <div
          className="event_dropdown"
          style={{
            visibility: isFocused ? "visible" : "hidden",
            height: isFocused ? "auto" : "0",
          }}
        >
          <div className="left_content">
            <p>{props.description}</p>
          </div>

          <div className="right_content">
            <div className="event_row_container">
              {props.speakers.length
                ? props.speakers.map((speaker) => (
                    <h4 key={speaker.id}>{speaker.name}</h4>
                  ))
                : null}
            </div>

            <div className="event_row_container">
              {props.public_url ? (
                <a href={props.public_url}>Workshop Recording</a>
              ) : null}
              {props.private_url ? (
                <a href={props.private_url}>Sign Up</a>
              ) : null}
            </div>

            <div className="event_row_container">
              {props.related_events.length
                ? props.related_events.map((event) => {
                    const currentEvent = unsortedEvents[event - 1];
                    return (
                     (
                        <a
                          key={"event_" + eventId + "_related_to_" + currentEvent.id}
                          onClick={(e) => handleEventClick(e, currentEvent.id)}
                        >
                          {currentEvent.name}
                        </a>
                      )
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

import React from "react";
import "./Event.css";

const Event = ({
  props,
  unsortedEvents,
  eventId,
  scrollToEvent,
  isFocused,
  backgroundColor,
}) => {
  const handleEventClick = (e, relatedEventId) => {
    e.stopPropagation();
    scrollToEvent(relatedEventId);
  };

  const getDateFromMilliseconds = (milliseconds) => {
    return new Date(milliseconds).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeFromMilliseconds = (milliseconds) => {
    return new Date(milliseconds).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      id={eventId}
      onClick={() => {
        scrollToEvent(props.id);
      }}
    >
      <div
        id="event"
        style={{
          backgroundColor: isFocused ? backgroundColor : "white",
          height: isFocused ? "auto" : "30vh",
        }}
      >
        <div className="header">
          <h2 className="header_title">{props.name}</h2>
          <div className="event_info_container">
            <h4 className="event_type">{props.event_type}</h4>
            <h4 className="event_time">
              {getDateFromMilliseconds(props.start_time)}{" "}
              {getTimeFromMilliseconds(props.start_time)} -{" "}
              {getTimeFromMilliseconds(props.end_time)}
            </h4>
          </div>
        </div>

        <div
          className="event_dropdown"
          style={{
            visibility: isFocused ? "visible" : "hidden",
            height: isFocused ? "auto" : "0",
          }}
        >
          <div className="event_content">
            <div className="content_header">
              {props.speakers.length > 0 && (
                <div>
                  {props.speakers.map((speaker) => (
                    <h4 key={speaker.id}>{speaker.name} </h4>
                  ))}
                </div>
              )}
              <h3>•</h3>
              {props.public_url ? <a href={props.public_url} onClick={(e) => e.stopPropagation()}> Public</a> : null}
              <h3>•</h3>
              {props.private_url ? (
                <a href={props.private_url} onClick={(e) => e.stopPropagation()}>Private</a>
              ) : null}
            </div>

            <p>{props.description}</p>
            <div className="related_events_container">
              <h3>Related Events:</h3>
              {props.related_events.length
                ? props.related_events.map((event) => {
                    const currentEvent = unsortedEvents[event - 1];
                    return (
                      <a
                        key={
                          "event_" + eventId + "_related_to_" + currentEvent.id
                        }
                        onClick={(e) => handleEventClick(e, currentEvent.id)}
                      >
                        {currentEvent.name}
                      </a>
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

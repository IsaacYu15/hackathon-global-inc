import React from "react";
import "./Event.css";

const Event = ({
  props,
  unsortedEvents,
  eventId,
  scrollToEvent,
  isFocused,
  isLoggedIn,
  backgroundColor,
}) => {

  {/*ensures click the card doesnt' activate / propogate to parent's on click*/}
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
          height: isFocused ? "auto" : "25vh",
        }}
      >
        <div className="header">
          <h2 className="header_title">{props.name}</h2>
          <div className="event_info_container">
            {/*_ also denote spaces in our data*/}
            <h4 className="event_type">{props.event_type.replace(/_/g, " ")}</h4>
            <h4 className="event_time">
              {getDateFromMilliseconds(props.start_time) +
                getTimeFromMilliseconds(props.start_time) +
                " - " +
                getTimeFromMilliseconds(props.end_time)}
            </h4>
          </div>
        </div>

        {/*show event information if the card is clicked*/}
        <div
          className="event_dropdown"
          style={{
            visibility: isFocused ? "visible" : "hidden",
            height: isFocused ? "auto" : "0",
          }}
        >
          <div className="event_content">
            {/*display urls */}
            <div className="row_container">
              {props.public_url && (
                <a href={props.public_url} onClick={(e) => e.stopPropagation()}>
                  Public
                </a>
              )}
              {props.private_url && isLoggedIn && (
                <a
                  href={props.private_url}
                  onClick={(e) => e.stopPropagation()}
                >
                  Private
                </a>
              )}
            </div>

            {/*display speakers*/}
            <div>
              {props.speakers.length > 0 && (
                <div>
                  {props.speakers.map((speaker) => (
                    <div key={"speaker_" + speaker.id} className="row_container">
                      {speaker.profile_pic && (<img className="speaker_image" src={speaker.profile_pic}></img>) }
                      <h4>{speaker.name} </h4>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*display event description*/}
            <p>{props.description}</p>

            {/*display related events if the user has permission to see it*/}
            <div className="related_events_container">
              {props.related_events.length > 0 && (
                <>
                  <h3>Related Events</h3>
                  {props.related_events.map((event) => {
                    const relatedEvent = unsortedEvents[event - 1];

                    if (relatedEvent.permission !== "public" &! isLoggedIn)
                      return null;
                    
                    return (
                      <a
                        key={relatedEvent.name + "_related_" + event.id}
                        onClick={(e) => handleEventClick(e, relatedEvent.id)}
                      >
                        {relatedEvent.name}
                      </a>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

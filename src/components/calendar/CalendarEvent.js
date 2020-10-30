import React from "react";
export const CalendarEvent = ({ event }) => {
  return (
    <div className="flex-column align-items-start d-flex">
      <strong>{event.title}</strong>
      <span className='mt-2'>- {event.user.name}</span>
    </div>
  );
};

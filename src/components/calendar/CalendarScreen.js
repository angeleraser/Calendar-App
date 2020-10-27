import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { CalendarEvent } from "./CalendarEvent";
import {
  eventStyleGetter,
  onChangeView,
  onDoubleClick,
  onSelectEvent,
  onSelectSlot,
} from "./helpers";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { AddNewFab } from "../ui/AddNewFab";
const localizer = momentLocalizer(moment);
export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
      localStorage.getItem("last-view") || "month"
    ),
    { events, activeEvent } = useSelector(({ calendar }) => calendar),
    dispatch = useDispatch();
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick(dispatch)}
        onSelectEvent={onSelectEvent(dispatch)}
        onSelectSlot={onSelectSlot(dispatch)}
        selectable={true}
        onView={onChangeView(setLastView)}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      {!!activeEvent && <DeleteEventFab />}
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};

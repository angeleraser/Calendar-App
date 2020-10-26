import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CalendarEvent } from "./CalendarEvent";
import {
  eventStyleGetter,
  onChangeView,
  onDoubleClick,
  onSelectEvent,
} from "./helpers";
import { CalendarModal } from "./CalendarModal";
import { useDispatch } from "react-redux";
import { AddNewFab } from "../ui/AddNewFab";
const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Learn React",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgColor: "#fafafa",
  },
];
export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
      localStorage.getItem("last-view") || "month"
    ),
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
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent(dispatch)}
        onView={onChangeView(setLastView)}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};

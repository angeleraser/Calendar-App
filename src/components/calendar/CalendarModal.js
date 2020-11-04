/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, eventClearActiveEvent } from "../../actions/ui";
import { eventStartAddNew, eventStartUpdate } from "../../actions/calendar";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}
export const CalendarModal = () => {
  const [
    formValues,
    [handleInputValue, setStartDate, setEndDate, setFormValues],
    handleSubmit,
    resetForm,
  ] = useForm({
    title: "",
    notes: "",
  });
  const [{ title, notes }, startDate, endDate] = formValues;
  const [isInvalid, setInvalid] = useState(false);
  const { isModalOpen } = useSelector(({ ui }) => ui);
  const { activeEvent } = useSelector(({ calendar }) => calendar);
  const dispatch = useDispatch();
  const onRequestcloseModal = () => {
    dispatch(eventClearActiveEvent());
    dispatch(closeModal());
    resetForm();
  };
  const validateForm = () => {
    const momentStart = moment(startDate),
      momentEnd = moment(endDate);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "Start date should be less than end date.",
        "error"
      );
    } else if (title.trim().length < 2) {
      setInvalid(true);
    } else {
      const event = {
        title,
        notes,
        start: startDate,
        end: endDate,
      };
      if (activeEvent) {
        dispatch(
          eventStartUpdate({
            ...activeEvent,
            title,
            notes,
            start: startDate,
            end: endDate,
          })
        );
      } else {
        dispatch(eventStartAddNew(event));
      }
      resetForm();
      dispatch(eventClearActiveEvent());
      dispatch(closeModal());
      setInvalid(false);
    }
  };
  // Reset or update form if active note
  useEffect(() => {
    if (activeEvent) {
      // Update current form values with the event selected values
      const { title, notes, start, end } = activeEvent;
      setFormValues({
        title,
        notes,
      });
      setStartDate(start);
      setEndDate(end);
    } else {
      resetForm();
    }
  }, [activeEvent]);
  return (
    <Modal
      isOpen={isModalOpen}
      className="modal"
      overlayClassName="modal-fondo"
      onRequestClose={onRequestcloseModal}
      closeTimeoutMS={200}
      style={customStyles}>
      <h1> New Event</h1>
      <hr />
      <form onSubmit={handleSubmit(validateForm)} className="container">
        <div className="form-group">
          <label>Start date</label>
          <DateTimePicker
            onChange={setStartDate}
            value={startDate}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>End date</label>
          <DateTimePicker
            onChange={setEndDate}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Subject and notes</label>
          <input
            type="text"
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            placeholder="Subject"
            name="title"
            value={title}
            onChange={handleInputValue}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Type your notes here..."
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputValue}></textarea>
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="fa fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};

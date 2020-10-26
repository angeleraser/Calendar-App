import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
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
Modal.setAppElement("#root");
export const CalendarModal = () => {
  const [
      formValues,
      [handleInputValue, setStartDate, setEndDate],
      handleSubmit,
    ] = useForm({
      title: "",
      notes: "",
    }),
    [{ title, notes }, startDate, endDate] = formValues,
    [isInvalid, setInvalid] = useState(false),
    { isModalOpen } = useSelector(({ ui }) => ui),
    closeModal = () => {
      // setModalIsOpen(false);
    },
    validateForm = () => {
      const momentStart = moment(startDate),
        momentEnd = moment(endDate);
      if (momentStart.isSameOrAfter(momentEnd)) {
        return Swal.fire(
          "Error",
          "Fecha de inicio debe ser menor a la fecha de fin",
          "error"
        );
      } else if (title.trim().length < 2) {
        setInvalid(true);
      } else {
        setInvalid(false);
      }
    };
  return (
    <Modal
      isOpen={isModalOpen}
      className="modal"
      overlayClassName="modal-fondo"
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}>
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={handleSubmit(validateForm)} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={setStartDate}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={setEndDate}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputValue}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputValue}></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

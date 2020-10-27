import { useState } from "react";
import moment from "moment";
const initDate = moment().minutes(0).seconds(0).add(1, "hours");
const lastDate = moment().clone().minutes(0).seconds(0).add(2, "hours");
export const useForm = (initState = {}) => {
  const [formValues, setFormValues] = useState(initState);
  const [startDate, setStartDate] = useState(initDate.toDate());
  const [endDate, setEndDate] = useState(lastDate.toDate());
  const handleInputChange = ({ target }) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    },
    reset = () => {
      setFormValues(initState);
      setStartDate(initDate.toDate());
      setEndDate(lastDate.toDate());
    },
    handleSubmit = (callback) => {
      return (e) => {
        e.preventDefault();
        callback();
      };
    };
  return [
    [formValues, startDate, endDate],
    [handleInputChange, setStartDate, setEndDate, setFormValues],
    handleSubmit,
    reset,
  ];
};

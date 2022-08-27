import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      minDate={new Date()}
      dateFormat="dd/MM/yyyy"
      styles={{ minHeight: "60px" }}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        props.setDate(date);
      }}
    />
  );
};

export default CustomDatePicker;

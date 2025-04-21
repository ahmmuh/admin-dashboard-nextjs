import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComponent({ onChange, selectedDate }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
    />
  );
}

export default DatePickerComponent;

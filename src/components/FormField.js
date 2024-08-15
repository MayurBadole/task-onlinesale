import React from "react";

const FormField = ({ field, register }) => {
  switch (field.type) {
    case "text":
      return <input {...register(field.label)} placeholder={field.label} />;
    case "textarea":
      return <textarea {...register(field.label)} placeholder={field.label} />;
    case "dropdown":
      return (
        <select {...register(field.label)}>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return <input type="checkbox" {...register(field.label)} />;
    case "radio":
      return field.options.map((option, index) => (
        <div key={index}>
          <input type="radio" value={option} {...register(field.label)} />
          {option}
        </div>
      ));
    case "file":
      return <input type="file" {...register(field.label)} />;
    default:
      return null;
  }
};

export default FormField;

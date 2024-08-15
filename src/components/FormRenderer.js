import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormConfigContext from "../customContext/FormConfigContext";
import FormField from "./FormField";
import { useNavigate } from "react-router-dom";

const FormRenderer = () => {
  const { formConfig } = useContext(FormConfigContext);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape(
    formConfig.reduce((acc, field) => {
      if (field.type === "file") {
        acc[field.label] = yup
          .mixed()
          .test("required", "This field is required", (value) => {
            if (field.validation.required) return value.length > 0;
            return true;
          })
          .test("fileSize", "File is too large", (value) => {
            if (value && value[0]) {
              return (
                value[0].size <= field.validation.maxFileSize * 1024 * 1024
              );
            }
            return true;
          })
          .test("fileType", "Unsupported File Format", (value) => {
            if (value && value[0]) {
              const fileType = value[0].type;
              return field.validation.allowedFileTypes.includes(fileType);
            }
            return true;
          });
      } else {
        if (field.validation && field.validation.required) {
          acc[field.label] = yup.string().required("This field is required");
        }
        if (field.validation && field.validation.minLength) {
          acc[field.label] = acc[field.label]
            ? acc[field.label].min(
                field.validation.minLength,
                `Minimum length is ${field.validation.minLength}`
              )
            : yup
                .string()
                .min(
                  field.validation.minLength,
                  `Minimum length is ${field.validation.minLength}`
                );
        }
        if (field.validation && field.validation.maxLength) {
          acc[field.label] = acc[field.label]
            ? acc[field.label].max(
                field.validation.maxLength,
                `Maximum length is ${field.validation.maxLength}`
              )
            : yup
                .string()
                .max(
                  field.validation.maxLength,
                  `Maximum length is ${field.validation.maxLength}`
                );
        }
        if (field.validation && field.validation.pattern) {
          acc[field.label] = acc[field.label]
            ? acc[field.label].matches(
                new RegExp(field.validation.pattern),
                "Invalid format"
              )
            : yup
                .string()
                .matches(
                  new RegExp(field.validation.pattern),
                  "Invalid format"
                );
        }
      }
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Save form configuration to localStorage
    const savedConfigs = JSON.parse(localStorage.getItem("formConfigs")) || [];
    localStorage.setItem(
      "formConfigs",
      JSON.stringify([...savedConfigs, data])
    );

    // Navigate to Home component
    navigate("/");
  };

  const shouldFieldBeVisible = (field, watch) => {
    const { dependsOn, condition } = field.visibility;
    if (!dependsOn) return true;
    return watch(dependsOn) === condition;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-renderer">
      {formConfig.map((field) =>
        shouldFieldBeVisible(field, watch) ? (
          <div key={field.id}>
            <label>{field.label}</label>
            <FormField field={field} register={register} />
            {errors[field.label] && (
              <span className="error-message">
                {errors[field.label]?.message}
              </span>
            )}
          </div>
        ) : null
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormRenderer;

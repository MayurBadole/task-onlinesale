// import React, { useState, useContext } from "react";
// import FormConfigContext from "../customContext/FormConfigContext";
// import { useNavigate } from "react-router-dom";

// const FormBuilder = () => {
//   const { formConfig, setFormConfig } = useContext(FormConfigContext);
//   const [fieldType, setFieldType] = useState("text");
//   const navigate = useNavigate();

//   const addField = () => {
//     setFormConfig([
//       ...formConfig,
//       {
//         id: Date.now(),
//         label: `Field ${formConfig.length + 1}`,
//         type: fieldType,
//         options: fieldType === "dropdown" || fieldType === "radio" ? [] : null,
//         validation: {
//           required: false,
//           minLength: 0,
//           maxLength: 0,
//         },
//         visibility: {
//           dependsOn: "",
//           condition: "",
//         },
//       },
//     ]);
//   };

//   const handleLabelChange = (id, value) => {
//     setFormConfig(
//       formConfig.map((field) =>
//         field.id === id ? { ...field, label: value } : field
//       )
//     );
//   };

//   const handleFieldOptionsChange = (id, options) => {
//     setFormConfig(
//       formConfig.map((field) =>
//         field.id === id ? { ...field, options } : field
//       )
//     );
//   };

//   const updateValidation = (id, field, value) => {
//     setFormConfig(
//       formConfig.map((item) =>
//         item.id === id
//           ? { ...item, validation: { ...item.validation, [field]: value } }
//           : item
//       )
//     );
//   };

//   const removeField = (id) => {
//     setFormConfig(formConfig.filter((field) => field.id !== id));
//   };
//   const updateVisibility = (id, field, value) => {
//     setFormConfig(
//       formConfig.map((item) =>
//         item.id === id
//           ? { ...item, visibility: { ...item.visibility, [field]: value } }
//           : item
//       )
//     );
//   };

//   const navigateToFormRenderer = () => {
//     navigate("/form-renderer");
//   };

//   return (
//     <div>
//       <select onChange={(e) => setFieldType(e.target.value)} value={fieldType}>
//         <option value="text">Text Input</option>
//         <option value="textarea">Text Area</option>
//         <option value="dropdown">Dropdown</option>
//         <option value="checkbox">Checkbox</option>
//         <option value="radio">Radio Button</option>
//       </select>
//       <button onClick={addField}>Add Field</button>

//       <div>
//         {formConfig.map((field) => (
//           <div className="field-group" key={field.id}>
//             <input
//               type="text"
//               value={field.label}
//               onChange={(e) => handleLabelChange(field.id, e.target.value)}
//               placeholder="Field Label"
//             />
//             {(field.type === "dropdown" || field.type === "radio") && (
//               <textarea
//                 value={field.options.join("\n")}
//                 onChange={(e) =>
//                   handleFieldOptionsChange(field.id, e.target.value.split("\n"))
//                 }
//                 placeholder="Enter options separated by newline"
//               />
//             )}
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={field.validation.required}
//                   onChange={(e) =>
//                     updateValidation(field.id, "required", e.target.checked)
//                   }
//                 />
//                 Required
//               </label>
//               <label>
//                 Min Length:
//                 <input
//                   type="number"
//                   value={field.validation.minLength || ""}
//                   onChange={(e) =>
//                     updateValidation(
//                       field.id,
//                       "minLength",
//                       parseInt(e.target.value, 10)
//                     )
//                   }
//                 />
//               </label>
//               <label>
//                 Max Length:
//                 <input
//                   type="number"
//                   value={field.validation.maxLength || ""}
//                   onChange={(e) =>
//                     updateValidation(
//                       field.id,
//                       "maxLength",
//                       parseInt(e.target.value, 10)
//                     )
//                   }
//                 />
//               </label>
//             </div>
//             <div>
//               <label>Show only if:</label>
//               <select
//                 value={field.visibility.dependsOn}
//                 onChange={(e) =>
//                   updateVisibility(field.id, "dependsOn", e.target.value)
//                 }
//               >
//                 <option value="">None</option>
//                 {formConfig.map(
//                   (f) =>
//                     f.id !== field.id && (
//                       <option key={f.id} value={f.label}>
//                         {f.label}
//                       </option>
//                     )
//                 )}
//               </select>
//               <input
//                 type="text"
//                 placeholder="Condition value"
//                 value={field.visibility.condition}
//                 onChange={(e) =>
//                   updateVisibility(field.id, "condition", e.target.value)
//                 }
//               />
//             </div>
//             <button
//               className="remove-button"
//               onClick={() => removeField(field.id)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//       <button onClick={navigateToFormRenderer}>Build Form</button>
//     </div>
//   );
// };

// export default FormBuilder;

import React, { useState, useContext } from "react";
import FormConfigContext from "../customContext/FormConfigContext";
import { useNavigate } from "react-router-dom";

const FormBuilder = () => {
  const { formConfig, setFormConfig } = useContext(FormConfigContext);
  const [fieldType, setFieldType] = useState("text");
  const navigate = useNavigate();

  const addField = () => {
    setFormConfig([
      ...formConfig,
      {
        id: Date.now(),
        label: `Field ${formConfig.length + 1}`,
        type: fieldType,
        options: fieldType === "dropdown" || fieldType === "radio" ? [] : null,
        validation: {
          required: false,
          minLength: 0,
          maxLength: 0,
          // allowedFileTypes: fieldType === "file" ? [] : null,
          maxFileSize: fieldType === "file" ? 0 : null,
          allowedFileTypes: ["application/pdf", "image/png"], // Allow PDF and PNG files
        },
        visibility: {
          dependsOn: "",
          condition: "",
        },
      },
    ]);
  };

  const handleLabelChange = (id, value) => {
    setFormConfig(
      formConfig.map((field) =>
        field.id === id ? { ...field, label: value } : field
      )
    );
  };

  const handleFieldOptionsChange = (id, options) => {
    setFormConfig(
      formConfig.map((field) =>
        field.id === id ? { ...field, options } : field
      )
    );
  };

  const updateValidation = (id, field, value) => {
    setFormConfig(
      formConfig.map((item) =>
        item.id === id
          ? { ...item, validation: { ...item.validation, [field]: value } }
          : item
      )
    );
  };

  const removeField = (id) => {
    setFormConfig(formConfig.filter((field) => field.id !== id));
  };

  const updateVisibility = (id, field, value) => {
    setFormConfig(
      formConfig.map((item) =>
        item.id === id
          ? { ...item, visibility: { ...item.visibility, [field]: value } }
          : item
      )
    );
  };

  const navigateToFormRenderer = () => {
    navigate("/form-renderer");
  };

  return (
    <div>
      <select onChange={(e) => setFieldType(e.target.value)} value={fieldType}>
        <option value="text">Text Input</option>
        <option value="textarea">Text Area</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio Button</option>
        <option value="file">File Upload</option>
      </select>
      <button onClick={addField}>Add Field</button>

      <div>
        {formConfig.map((field) => (
          <div className="field-group" key={field.id}>
            <input
              type="text"
              value={field.label}
              onChange={(e) => handleLabelChange(field.id, e.target.value)}
              placeholder="Field Label"
            />
            {(field.type === "dropdown" || field.type === "radio") && (
              <textarea
                value={field.options.join("\n")}
                onChange={(e) =>
                  handleFieldOptionsChange(field.id, e.target.value.split("\n"))
                }
                placeholder="Enter options separated by newline"
              />
            )}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={field.validation.required}
                  onChange={(e) =>
                    updateValidation(field.id, "required", e.target.checked)
                  }
                />
                Required
              </label>
              {field.type !== "file" && (
                <>
                  <label>
                    Min Length:
                    <input
                      type="number"
                      value={field.validation.minLength || ""}
                      onChange={(e) =>
                        updateValidation(
                          field.id,
                          "minLength",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </label>
                  <label>
                    Max Length:
                    <input
                      type="number"
                      value={field.validation.maxLength || ""}
                      onChange={(e) =>
                        updateValidation(
                          field.id,
                          "maxLength",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </label>
                </>
              )}
              {field.type === "file" && (
                <>
                  <label>
                    Allowed File Types (comma separated):
                    <input
                      type="text"
                      value={field.validation.allowedFileTypes || ""}
                      onChange={(e) =>
                        updateValidation(
                          field.id,
                          "allowedFileTypes",
                          e.target.value.split(",").map((type) => type.trim())
                        )
                      }
                    />
                  </label>
                  <label>
                    Max File Size (in MB):
                    <input
                      type="number"
                      value={field.validation.maxFileSize || ""}
                      onChange={(e) =>
                        updateValidation(
                          field.id,
                          "maxFileSize",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </label>
                </>
              )}
            </div>
            <div>
              <label>Show only if:</label>
              <select
                value={field.visibility.dependsOn}
                onChange={(e) =>
                  updateVisibility(field.id, "dependsOn", e.target.value)
                }
              >
                <option value="">None</option>
                {formConfig.map(
                  (f) =>
                    f.id !== field.id && (
                      <option key={f.id} value={f.label}>
                        {f.label}
                      </option>
                    )
                )}
              </select>
              <input
                type="text"
                placeholder="Condition value"
                value={field.visibility.condition}
                onChange={(e) =>
                  updateVisibility(field.id, "condition", e.target.value)
                }
              />
            </div>
            <button
              className="remove-button"
              onClick={() => removeField(field.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => navigateToFormRenderer()}>Build Form</button>
    </div>
  );
};

export default FormBuilder;

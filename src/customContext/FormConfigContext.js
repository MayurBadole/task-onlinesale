import React, { createContext, useState } from "react";

const FormConfigContext = createContext();

export const FormConfigProvider = ({ children }) => {
  const [formConfig, setFormConfig] = useState([]);

  return (
    <FormConfigContext.Provider value={{ formConfig, setFormConfig }}>
      {children}
    </FormConfigContext.Provider>
  );
};

export default FormConfigContext;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [formConfigs, setFormConfigs] = useState([]);

  useEffect(() => {
    const savedConfigs = JSON.parse(localStorage.getItem("formConfigs")) || [];
    setFormConfigs(savedConfigs);
  }, []);

  const removeAllConfigs = () => {
    localStorage.removeItem("formConfigs");
    setFormConfigs([]);
  };

  return (
    <div>
      <h1> Form Generator </h1>
      <div>
        <Link to="/form-builder">
          <button>Create New Form</button>
        </Link>
        <button onClick={removeAllConfigs} style={{ marginLeft: "10px" }}>
          Remove All Configurations
        </button>
      </div>
      {formConfigs.length === 0 ? (
        <p>No form Data saved.</p>
      ) : (
        <ul>
          {formConfigs.map((config, index) => (
            <li key={index}>
              <pre>{JSON.stringify(config, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerEmpty, faThermometerHalf, faThermometerFull } from '@fortawesome/free-solid-svg-icons';
import './thermometer.css';

const Thermometer = () => {
  const [thermometer, setThermometer] = useState(faThermometerEmpty);

  useEffect(() => {
    const icons = [faThermometerEmpty, faThermometerHalf, faThermometerFull];
    let index = 0;

    const interval = setInterval(() => {
      setThermometer(icons[index]);
      index = (index + 1) % icons.length;
    }, 1000); // Change every  second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="thermometer-container">
      <span className="thermometer-icon">
        <FontAwesomeIcon icon={thermometer} />
      </span>
    </div>
  );
};

export default Thermometer;

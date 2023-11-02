import React, { useEffect, useState } from "react";
import "./direction.css";

import fetchDirections from "../../api/fetchDirections";

const Direction = ({ setRoute }) => {
  const [origin] = useState(
    "house no 17, Gayatri kunj, Chitralekha lane, near gnrc hospital, Usha Nagar, Guwahati, Assam 781006"
  );
  const [destination] = useState(
    "Super Market, GNRC Rd, Dispur, Rukmini Gaon, Guwahati, Assam 781005"
  );

  useEffect(() => {
    fetchDirections(origin, destination, setRoute);
  }, [origin, destination]);

  return (
    <div className="directions">
      <h2>Directions</h2>
      <h3>Origin</h3>
      <p>{origin}</p>
      <h3>Destination</h3>
      <p>{destination}</p>
    </div>
  );
};

export default Direction;

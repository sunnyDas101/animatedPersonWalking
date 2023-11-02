import React, { useEffect, useRef, useState } from "react";
import './myMap.css'

import Direction from "../direction/Direction";
import Animation from "../Animation";


const MyMap = ({ mapOptions }) => {
  const [route, setRoute] = useState();
  const [map, setMap] = useState();
  const ref = useRef();

  console.log(route)

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} id="map" />
      {map && <Direction setRoute={setRoute} />}
      {map && route && <Animation map={map} setMap={setMap} route={route} mapOptions={mapOptions} />}
    </>
  );
};

export default MyMap;

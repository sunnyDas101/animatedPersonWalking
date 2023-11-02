import { useEffect, useRef, useState } from 'react'
import './App.css'

import { Wrapper } from '@googlemaps/react-wrapper'
import MyMap from './components/myMap/MyMap'


const Apikey = "AIzaSyBwS3wSha9z1T5ivM6AJ5wyPOHm-b8gdi8"

const mapOptions = {
  mapId: "26c3c7850bc2f78a",
  center: {lat: 26.139974528220236, lng: 91.79495599612021},
  zoom: 19,
  disableDefaultUi: true,
  heading: 25,
  tilt: 60,
}

export default function App() {
  return (
    <Wrapper apiKey={Apikey} >
      <MyMap mapOptions={mapOptions} />
    </Wrapper>
  )
}







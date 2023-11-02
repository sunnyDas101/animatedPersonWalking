import React, { useEffect, useRef } from "react";

import ThreeJSOverlayView from "@ubilabs/threejs-overlay-view";
import { CatmullRomCurve3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import createTrackFromCurve from './createTrackFromCurve'

const ANIMATION_MS = 15000;
const FRONT_VECTOR = new Vector3(0, -1, 0);

const Animation = ({ map, setMap, route, mapOptions }) => {
  const overlayRef = useRef();
  const trackRef = useRef();
  const humanRef = useRef();

  useEffect(() => {
    map.setCenter(route[Math.floor(route.length / 2)], 17);

    if (!overlayRef.current) {
        overlayRef.current = new ThreeJSOverlayView(mapOptions.center);
        overlayRef.current.setMap(map);
      }
  
      const scene = overlayRef.current.getScene();
      const points = route.map((p) => overlayRef.current.latLngAltToVector3(p));
      const curve = new CatmullRomCurve3(points);

    //TRACK  
    if (trackRef.current) {
      scene.remove(trackRef.current);
    }
    trackRef.current = createTrackFromCurve(curve);
    scene.add(trackRef.current);
    
    //MODEL
    loadModel().then((model) => {
      if (humanRef.current) {
        scene.remove(humanRef.current);
      }
      humanRef.current = model;
      scene.add(humanRef.current);
    });

    overlayRef.current.update = () => {
      trackRef.current.material.resolution.copy(
        overlayRef.current.getViewportSize()
      );

      if (humanRef.current) {
        const progress = (performance.now() % ANIMATION_MS) / ANIMATION_MS;
        curve.getPointAt(progress, humanRef.current.position);
        humanRef.current.quaternion.setFromUnitVectors(
          FRONT_VECTOR,
          curve.getTangentAt(progress)
        );
        humanRef.current.rotateX(Math.PI / 2);
      }

      overlayRef.current.requestRedraw();
    };

    return () => {
      scene.remove(trackRef.current);
      scene.remove(humanRef.current);
    };
  }, [route]);

  return null;
};


async function loadModel() {
  const loader = new GLTFLoader();
  const object = await loader.loadAsync("/low_poly_male_base/scene.gltf");
  const group = object.scene;
  group.scale.setScalar(0.05);

  return group;
}


export default Animation;



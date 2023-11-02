import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";

const createTrackFromCurve = (curve) => {
    const points = curve.getSpacedPoints(curve.points.length * 10);
    const positions = points.map((point) => point.toArray()).flat();
  
    return new Line2(
      new LineGeometry().setPositions(positions),
      new LineMaterial({
        color: 0x0174BE,
        linewidth: 6,
      })
    );
}

export default createTrackFromCurve
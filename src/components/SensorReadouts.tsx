"use client";

import { useEffect, useRef } from "react";

type Sensor = { v: number; min: number; max: number; step: number; dp: number };

const INITIAL_SENSORS: Record<string, Sensor> = {
  temp: { v: 21.8, min: 21.2, max: 22.6, step: 0.15, dp: 1 },
  rh: { v: 67.2, min: 64.0, max: 70.0, step: 0.4, dp: 1 },
  vpd: { v: 0.94, min: 0.88, max: 1.02, step: 0.02, dp: 2 },
};

export function SensorReadouts() {
  const sensorsRef = useRef(INITIAL_SENSORS);

  useEffect(() => {
    const id = window.setInterval(() => {
      for (const [key, sensor] of Object.entries(sensorsRef.current)) {
        sensor.v += (Math.random() - 0.5) * 2 * sensor.step;
        sensor.v = Math.min(sensor.max, Math.max(sensor.min, sensor.v));
        document.querySelectorAll(`[data-readout="${key}"]`).forEach((el) => {
          el.textContent = sensor.v.toFixed(sensor.dp);
        });
      }
    }, 2000);

    return () => window.clearInterval(id);
  }, []);

  return null;
}

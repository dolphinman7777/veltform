import { SlideBridgeStrawberry } from "@/components/home/SlideBridgeStrawberry";
import { SensorsIntroHeadline } from "@/components/home/SensorsIntroHeadline";

export function ArchToSensorsBand() {
  return (
    <div className="veld-arch-to-sensors-band">
      <div className="veld-strawberry-rhythm">
        <div className="veld-strawberry-rhythm__spacer" aria-hidden="true" />
        <SlideBridgeStrawberry />
        <div className="veld-strawberry-rhythm__spacer" aria-hidden="true" />
      </div>
      <SensorsIntroHeadline />
    </div>
  );
}

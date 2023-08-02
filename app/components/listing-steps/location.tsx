"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import Map, { Location } from "../map/map";

interface LocationStepProps {
  location: Location;
  setValue: (value: any) => void;
}

const LocationStep: FunctionComponent<LocationStepProps> = ({
  location,
  setValue,
}) => {
  return (
    <>
      <Heading
        title="Where's your place located?"
        subtitle="Your address is only shared with guests after they’ve made a reservation."
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <Map location={location} setValue={setValue} />
    </>
  );
};

export default LocationStep;

import { FunctionComponent } from "react";
import Heading from "../heading";
import Counter from "../inputs/counter";

interface InfoStepProps {
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  setValue: (id: string, value: any) => void;
}

const InfoStep: FunctionComponent<InfoStepProps> = ({
  guestCount,
  bedroomCount,
  bedCount,
  bathroomCount,
  setValue,
}) => {
  return (
    <>
      <Heading
        title="Share some basics about your place"
        subtitle="You'll add more details later, like bed types."
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <Counter
        value={guestCount}
        title="Guests"
        onChange={(value) => setValue("guestCount", value)}
      />
      <hr />
      <Counter
        value={bedroomCount}
        title="Bedrooms"
        onChange={(value) => setValue("bedroomCount", value)}
      />
      <hr />
      <Counter
        value={bedCount}
        title="Beds"
        onChange={(value) => setValue("bedCount", value)}
      />
      <hr />
      <Counter
        value={bathroomCount}
        title="Bathrooms"
        onChange={(value) => setValue("bathroomCount", value)}
      />
    </>
  );
};

export default InfoStep;

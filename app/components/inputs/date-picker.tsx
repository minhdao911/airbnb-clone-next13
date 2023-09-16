import { FunctionComponent } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface DatePickerProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (range: RangeKeyDict) => void;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[{ ...value, key: "selection" }]}
      onChange={onChange}
      disabledDates={disabledDates}
      showDateDisplay={false}
    />
  );
};

export default DatePicker;

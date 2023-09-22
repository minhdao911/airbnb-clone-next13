import { addDays, differenceInCalendarDays, isSameDay } from "date-fns";
import { FunctionComponent } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface DatePickerProps {
  value: Range;
  disabledDates?: Date[];
  months?: number;
  onChange: (range: RangeKeyDict) => void;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  months = 1,
  disabledDates,
  onChange,
}) => {
  const onDateChange = (range: RangeKeyDict) => {
    const rangeStartDate = range.selection.startDate;
    const rangeEndDate = range.selection.endDate;

    const today = new Date();

    if (rangeStartDate && rangeEndDate) {
      if (
        !value.startDate ||
        differenceInCalendarDays(rangeStartDate, value.startDate) < 0
      ) {
        range.selection.startDate = today;
      }
      if (isSameDay(rangeStartDate, rangeEndDate)) {
        range.selection.endDate = addDays(today, 1);
      }
      onChange(range);
    }
  };

  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[{ ...value, key: "selection" }]}
      months={months}
      direction="horizontal"
      onChange={onDateChange}
      disabledDates={disabledDates}
      showDateDisplay={false}
    />
  );
};

export default DatePicker;

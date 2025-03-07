import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface DatePickerFieldProps {
  label: string;
  date: string;
  setDate: (date: string) => void;
  error?: boolean;
}

function DatePickerField({
  label,
  date,
  setDate,
  error,
}: DatePickerFieldProps) {
  interface PersianToEnglishNumbers {
    (persianDate: string): string;
  }

  const persianToEnglishNumbers: PersianToEnglishNumbers = (persianDate) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return persianDate
      .split("")
      .map((char) => {
        const index = persianNumbers.indexOf(char);
        return index === -1 ? char : englishNumbers[index];
      })
      .join("");
  };
  return (
    <>
      <div>
        <DatePicker
          containerClassName={`datepicker-container ${
            error ? "error" : "valid"
          }`}
          inputClass="datepicker-input"
          calendarPosition="bottom-center"
          value={date}
          onChange={(newDate) => {
            if (newDate) {
              const formattedDate = newDate.format("YYYY-MM-DD");
              const englishDate = persianToEnglishNumbers(formattedDate);
              setDate(englishDate);
            }
          }}
          format="YYYY-MM-DD"
          calendar={persian}
          locale={persian_fa}
          placeholder={label}
        />
      </div>
      <style>{`/* DatePickerField.css */

/* Container style */
.datepicker-container {
  width: 100%;
  padding: 1px 6px;
  border-radius: 6px;
  border: 1px solid #e0e0e0; /* Light gray border */
}

.datepicker-container.error {
  border-color: #e57373; /* Red border for error */
  color: #e57373;
}

.datepicker-container.valid {
  border-color: #a6a6a6; /* Light border for valid state */
}

/* Input field style */
.datepicker-input {
  width: 100%;
  outline: none;
  font-size: 13px;
  padding: 8px;
  border: none;
  background-color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
}

.datepicker-input:focus {
  border-color: #1976d2; /* Blue border on focus */
}
`}</style>
    </>
  );
}

export default DatePickerField;

import React from "react";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import moment from "jalali-moment";

interface Reminder {
  title: string;
  description: string;
  onlyMe: boolean;
  members: string[];
  expiryDate: Date | null;
  priority: string;
  files: File[];
}
interface ReminderCardProps {
  reminder: Reminder;
  index: number;
  handleEditReminder: (index: number) => void;
  handleDeleteReminder: (index: number) => void;
}
const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  index,
  handleEditReminder,
  handleDeleteReminder,
}) => {
  return (
    <div className="border p-4 rounded shadow bg-gray-100">
      <div className="flex justify-between items-center gap-4 ">
        <strong>نام کاربر:</strong>{" "}
        <div className="flex justify-center items-center gap-3">
          <p>{reminder.onlyMe ? "Only Me" : reminder.members.join(", ")}</p>
          <p>
            <strong>الویت:</strong> {reminder.priority}
          </p>
        </div>
      </div>
      <div className="mr-10 border-r-4 border-red-500 mt-2 p-2">
        <div className="flex justify-start items-center gap-2">
          <p>
            {reminder.expiryDate
              ? moment(reminder.expiryDate).locale("en").format("YYYY-MM-DD")
              : "No expiry date"}
          </p>
          :<h3 className="font-bold">&lt;&lt; {reminder.title} &gt;&gt;</h3>
        </div>
        <p className="text-gray-400">{reminder.description}</p>
        <ul>
          {reminder.files.map((file, i) => (
            <li
              className="bg-white border-gray-300 rounded-lg p-4 max-w-[10rem]"
              key={i}
            >
              {file.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center gap-2 w-full mt-4">
          <button
            onClick={() => handleEditReminder(index)}
            className="text-gray-500 mr-2 rounded-full flex justify-start items-center gap-2 border border-gray-400 bg-white p-2"
          >
            <BiEdit />
            <p>ویرایش</p>
          </button>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleDeleteReminder(index)}
              className="text-gray-500 mr-2 rounded-full flex justify-start items-center gap-2"
            >
              <MdDone />

              <p>انجام شد</p>
            </button>
            <button
              onClick={() => handleDeleteReminder(index)}
              className="text-gray-500 mr-2 rounded-full flex justify-start items-center gap-2"
            >
              <FiDelete />
              <p>لغو یادآور</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReminderCard;

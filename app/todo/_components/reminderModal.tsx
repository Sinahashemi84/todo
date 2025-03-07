"use client";
import { useState, useEffect, useRef } from "react";
import { membersList } from "./../../info";
import { CgClose } from "react-icons/cg";
import DatePickerField from "./DatePickerField";

interface Reminder {
  done: boolean;
  title: string;
  description: string;
  onlyMe: boolean;
  members: string[];
  expiryDate: Date | null;
  priority: string;
  files: File[];
}

interface ReminderModalProps {
  newReminder: Reminder;
  setNewReminder: React.Dispatch<React.SetStateAction<Reminder>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleAddReminder: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReminderModal = ({
  newReminder,
  setNewReminder,
  showModal,
  setShowModal,
  editingIndex,
  setEditingIndex,
  handleAddReminder,
  handleFileChange,
}: ReminderModalProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showMemberList, setShowMemberList] = useState<boolean>(false);
  const memberListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        memberListRef.current &&
        !memberListRef.current.contains(event.target as Node)
      ) {
        setShowMemberList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMemberSelection = (member: string) => {
    if (!newReminder.members.includes(member)) {
      setNewReminder({
        ...newReminder,
        members: [...newReminder.members, member],
      });
    }
    setSearchTerm("");
    setShowMemberList(false);
  };

  const handleRemoveMember = (member: string) => {
    setNewReminder({
      ...newReminder,
      members: newReminder.members.filter((m) => m !== member),
    });
  };

  return (
    <>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="modalBack-class"
        ></div>
      )}
      {showModal && (
        <div className="modal-class">
          <div className="flex justify-between items-center gap-2 w-full border-b-2 border-gray-400 ">
            <h2 className="text-xl mb-4">
              {editingIndex !== null ? "ویرایش بادآور" : "ثبت بادآور"}
            </h2>
            <button
              onClick={() => {
                setShowModal(false);
                setEditingIndex(null);
              }}
            >
              <CgClose />
            </button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col justify-start gap-2 w-2/3">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={newReminder.onlyMe}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      onlyMe: e.target.checked,
                      members: e.target.checked ? [] : newReminder.members,
                    })
                  }
                  className="mr-2"
                />
                فقط برای خودم
              </label>
              <div className="mt-2">
                <p>اعضا:</p>
                {newReminder.members.map((member) => (
                  <div key={member} className="flex items-center mb-2">
                    <span className="bg-gray-200 px-2 py-1 rounded mr-2">
                      {member}
                    </span>
                    <button
                      onClick={() => handleRemoveMember(member)}
                      className="text-red-500 ml-2"
                    >
                      <CgClose />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Title"
                value={newReminder.title}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, title: e.target.value })
                }
                className="border p-2 w-full mb-2"
                required
              />
              <textarea
                placeholder="Description"
                value={newReminder.description}
                onChange={(e) =>
                  setNewReminder({
                    ...newReminder,
                    description: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
              ></textarea>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-1/3">
              {" "}
              {!newReminder.onlyMe && (
                <div className="mb-2 relative" ref={memberListRef}>
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onClick={() => setShowMemberList(!showMemberList)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 w-full mb-2"
                  />
                  {showMemberList && (
                    <div className="border max-h-40 overflow-y-auto absolute bg-white w-full">
                      {membersList
                        .filter((member) =>
                          member
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((member) => (
                          <div
                            key={member}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleMemberSelection(member)} // Calling the new function here
                          >
                            {member}{" "}
                            {newReminder.members.includes(member) && "✔"}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
              <DatePickerField
                label="انقضا"
                date={
                  newReminder.expiryDate
                    ? newReminder.expiryDate.toISOString().split("T")[0]
                    : ""
                }
                setDate={(date: string) => {
                  const selectedDate = new Date(date);
                  setNewReminder({ ...newReminder, expiryDate: selectedDate });
                }}
                error={false}
              />
              <select
                value={newReminder.priority}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, priority: e.target.value })
                }
                className="border p-2 w-full mb-2"
              >
                <option value="Low">کم</option>
                <option value="Medium">معمولی</option>
                <option value="High">بالا</option>
              </select>
            </div>
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border p-2 w-full mb-2"
          />
          <div className="flex justify-center items-center gap-2 w-full">
            <button
              onClick={() => {
                setShowModal(false);
                setEditingIndex(null);
              }}
              className="bg-white border rounded-full border-gray-300 text-black px-4 py-2 ml-2 w-full"
            >
              انصراف
            </button>
            <button
              onClick={handleAddReminder}
              className="bg-gray-500 text-white px-4 py-2 rounded-full w-full"
            >
              {editingIndex !== null ? "ویرایش یادآور" : "ثبت یادآور"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReminderModal;

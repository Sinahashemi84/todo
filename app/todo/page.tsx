"use client";
import { useState, useEffect } from "react";
import ReminderCard from "./_components/reminderCard";
import HeaderSection from "./_components/headerSection";
import ReminderModal from "./_components/reminderModal"; // import the new modal component

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

export default function Home() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newReminder, setNewReminder] = useState<Reminder>({
    done: false,
    title: "",
    description: "",
    onlyMe: false,
    members: [],
    expiryDate: null,
    priority: "Medium",
    files: [],
  });

  useEffect(() => {
    const storedReminders = JSON.parse(
      localStorage.getItem("reminders") || "[]"
    );
    setReminders(storedReminders);
  }, []);

  const handleAddReminder = () => {
    let updatedReminders;
    if (editingIndex !== null) {
      updatedReminders = reminders.map((reminder, index) =>
        index === editingIndex ? newReminder : reminder
      );
      setEditingIndex(null);
    } else {
      updatedReminders = [...reminders, newReminder];
    }
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));
    setShowModal(false);
    setNewReminder({
      done: false,
      title: "",
      description: "",
      onlyMe: false,
      members: [],
      expiryDate: null,
      priority: "Medium",
      files: [],
    });
  };

  const handleDeleteReminder = (index: number) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const handleEditReminder = (index: number) => {
    setNewReminder(reminders[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewReminder({ ...newReminder, files: Array.from(event.target.files) });
    }
  };

  return (
    <div className="p-6 firstPage">
      <HeaderSection setShowModal={setShowModal} />
      <div className="grid gap-4">
        {reminders.map((reminder, index) => (
          <ReminderCard
            key={index}
            index={index}
            reminder={reminder}
            handleEditReminder={handleEditReminder}
            handleDeleteReminder={handleDeleteReminder}
          />
        ))}
      </div>
      <ReminderModal
        newReminder={newReminder}
        setNewReminder={setNewReminder}
        showModal={showModal}
        setShowModal={setShowModal}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        handleAddReminder={handleAddReminder}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}

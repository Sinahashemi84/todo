import React from "react";
import { GrAdd } from "react-icons/gr";

interface HeaderSectionProps {
  setShowModal: (show: boolean) => void;
}

export default function HeaderSection({ setShowModal }: HeaderSectionProps) {
  return (
    <div className="flex w-full justify-between items-center gap-2 ">
      <h1 className="font-bold">یادآوری ها</h1>
      <button
        onClick={() => setShowModal(true)}
        className=" text-black p-2 mb-4 border border-gray-200 rounded-full"
      >
        <GrAdd size={16} className="text-black" />
      </button>
    </div>
  );
}

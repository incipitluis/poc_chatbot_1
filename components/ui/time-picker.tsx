import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePickerProps = {
    selected: string | null;
    onSelect: (time: string) => void;
    disabledTimes: string[];
  };



export function TimePicker({ selected, onSelect, disabledTimes }: TimePickerProps) {
  
  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM"
  ];

  return (
    <select value={selected || ''} onChange={(e) => onSelect(e.target.value)}>
      <option value="" disabled>Select a time</option>
      {times.map((time) => (
        <option key={time} value={time} disabled={disabledTimes.includes(time)}>
          {time}
        </option>
      ))}
    </select>
  );
}


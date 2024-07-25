"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateTimeSlots } from "@/app/lib/generate-time-slots";

export type CalendarProps = {
  className?: string;
  selectedTimestamp: Date | null;
  onSelectTimestamp: (timestamp: Date | null) => void;
  unavailableTimestamps: Date[];
};

function Calendar({
  className,
  selectedTimestamp,
  onSelectTimestamp,
  unavailableTimestamps,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = generateTimeSlots(9, 18, 30);

  const today = new Date();
  const oneYearFromNow = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );

  const isDayFullyBooked = (date: Date) => {
    const bookedTimes = unavailableTimestamps.filter(
      (timestamp) => timestamp.toDateString() === date.toDateString()
    );
    return bookedTimes.length >= times.length;
  };

  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      onSelectTimestamp(null);
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const timestamp = new Date(selectedDate);
    timestamp.setHours(hours, minutes, 0, 0);

    if (timestamp.getTime() === selectedTimestamp?.getTime()) {
      return;
    }

    onSelectTimestamp(timestamp);
  }, [selectedDate, selectedTime, onSelectTimestamp, selectedTimestamp]);

  return (
    <div>
      <DayPicker
        selected={selectedDate}
        onDayClick={(date) => !isDayFullyBooked(date) && setSelectedDate(date)}
        showOutsideDays
        className={cn("p-3", className)}
        disabled={(date) =>
          date < today || date > oneYearFromNow || isDayFullyBooked(date)
        }
        {...props}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "text-primary ",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
      />
      {selectedDate && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            Select a time
          </label>
          <select
            value={selectedTime || ""}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="block w-26 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a time
            </option>
            {times.map((time) => {
              const [hours, minutes] = time.split(":").map(Number);
              const timestamp = new Date(selectedDate);
              timestamp.setHours(hours, minutes, 0, 0);
              const isUnavailable = unavailableTimestamps.some(
                (unavailable) => unavailable.getTime() === timestamp.getTime()
              );
              return (
                <option key={time} value={time} disabled={isUnavailable}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
}

export { Calendar };

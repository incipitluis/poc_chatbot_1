"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { createAppointment } from "@/app/queries";
import { TimePicker } from "./time-picker";
import { useEffect, useState } from "react";
import { getAppointmentsByDate } from "@/app/queries";

const FormSchema = z.object({
  appointmentDate: z.date({
    required_error: "A date for the appointment is required.",
  }),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone number should contain only digits")
    .nonempty("Phone number is required"),
  appointmentTime: z.string().nonempty("Tell us when are you coming to meet us")
});

export function DatePickerForm() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      appointmentDate: undefined,
      appointmentTime: '',
    }
  });

  const { toast } = useToast()

  useEffect(() => {
    async function fetchUnavailableTimes() {
      if (selectedDate) {
        const appointments = await getAppointmentsByDate(selectedDate);
        const times = appointments.map(appointment => appointment.appointmentTime);
        setUnavailableTimes(times);
      }
    }
    fetchUnavailableTimes();
  }, [selectedDate]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createAppointment(data);
      toast({
        title: "Appointment scheduled",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Error scheduling appointment",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-500 p-4">
            <code className="">{(error as Error).message}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...field} type="text" className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} type="email" className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <input {...field} type="text" className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col text-white">
              <FormLabel>Pick a day!</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date);
                        setSelectedDate(date);
                    }}}
                    disabled={(date) =>
                      date < new Date() ||
                      date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                We are looking forward to meeting you &#x2665;
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pick a time!</FormLabel>
              <FormControl>
                <TimePicker
                  selected={selectedTime}
                  onSelect={(time: string) => {
                    field.onChange(time);
                    setSelectedTime(time);
                  }}
                  disabledTimes={unavailableTimes}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

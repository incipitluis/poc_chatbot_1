"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/components/ui/use-toast";
import { createAppointment, getAppointmentsByDateRange } from "@/app/queries";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const FormSchema = z.object({
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone number should contain only digits")
    .min(1),
  appointmentTimestamp: z.date({
    required_error: "A date and time for the appointment are required."
  }),
});

export function DatePickerForm() {
  const [selectedTimestamp, setSelectedTimestamp] = useState<Date | null>(null);
  const [unavailableTimestamps, setUnavailableTimestamps] = useState<Date[]>([]);
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      appointmentTimestamp: undefined,
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    async function fetchUnavailableTimestamps() {
      const today = new Date();
      const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      const appointments = await getAppointmentsByDateRange(today, oneYearFromNow);  // Supongamos que esta función obtiene todas las citas en el rango
      const timestamps = appointments.map(
        (appointment) => new Date(appointment.appointmentTimestamp)
      );
      setUnavailableTimestamps(timestamps);
    }
    fetchUnavailableTimestamps();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (
        !user ||
        !user.firstName ||
        !user.lastName ||
        !user.id ||
        !user.primaryEmailAddress?.emailAddress
      ) {
        return;
      }
      await createAppointment({
        ...data,
        firstName: user.firstName,
        lastName: user.lastName,
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
      });
      toast({
        title: "",
        description: (
          <div className="mt-2 w-[340px] bg-black rounded-md p-4 overflow-hidden">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-700 via-red-500 to-slate-200 bg-clip-text text-transparent">
              Appointment scheduled!
            </h1>
            <p className="text-white text-lg">
              We are looking forward to meeting you &#x2665;
            </p>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "",
        description: (
          <div className="mt-2 w-[340px] bg-black rounded-md p-4 overflow-hidden">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-900 via-red-500 to-slate-300 bg-clip-text text-transparent">
              Error!
            </h1>
          </div>
        ),
      });
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col shadow-lg rounded-md">
        <h2 className="text-xl text-white">
          Hola holita, {user?.firstName}, ¡rellena el formulario y dinos cuándo
          pasas a vernos!
        </h2>
        <h3 className="text-lg text-white">
          Te enviaremos una confirmación a {user?.primaryEmailAddress?.emailAddress}.
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="appointmentTimestamp"
            render={({ field }) => (
              <FormItem className="flex flex-col text-white">
                <FormLabel>Pick a day and time!</FormLabel>
                <FormControl>
                  <Calendar
                    selectedTimestamp={field.value}
                    onSelectTimestamp={(timestamp) => {
                      if (timestamp !== selectedTimestamp) {
                        field.onChange(timestamp);
                        setSelectedTimestamp(timestamp);
                      }
                    }}
                    unavailableTimestamps={unavailableTimestamps}
                  />
                </FormControl>
                <FormDescription>
                  We are looking forward to meeting you &#x2665;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

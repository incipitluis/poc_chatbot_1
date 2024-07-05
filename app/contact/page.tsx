import { DatePickerForm } from "@/components/ui/date-picker-form";


export default function ContactPage() {
    return (
      <main className="flex flex-col min-h-screen gap-8 items-center p-8 text-white">
        <h1>Reach out!</h1>
        <DatePickerForm></DatePickerForm> 
      </main>
    );
  }
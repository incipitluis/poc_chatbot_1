export default function generateAvailableSlots(startDate: Date, endDate: Date, occupiedSlots: Date[]): Date[] {
    const slots: Date[] = [];
    const currentDate = new Date(startDate);
  
   
    const startHour = 9;
    const endHour = 18; 
    const endMinute = 30; 
  
    while (currentDate <= endDate) {
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slot = new Date(currentDate);
          slot.setHours(hour, minute, 0, 0);
    
         
          if (!occupiedSlots.some(occupied => occupied.getTime() === slot.getTime())) {
            slots.push(slot);
          }
    
          
          if (hour === endHour && minute === endMinute) {
            break;
          }
        }
       
        if (hour === endHour) {
          break;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return slots;
  }
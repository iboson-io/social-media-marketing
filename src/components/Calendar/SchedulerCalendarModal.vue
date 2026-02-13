<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center lg:justify-end lg:mr-10"
    @click="$emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-[92%] md:max-w-2xl lg:max-w-lg mx-4 lg:mx-0 bg_secondary_color rounded-lg primary_border_color shadow-2xl"
      @click.stop
    >
     

      <!-- Date and Time Picker Container -->
      <div class="flex  flex-col md:flex-row ">
        <!-- Date Picker (Left Side) -->
        <div class="px-5xl pt-6xl pb-md md:w-2/3">
           <!-- Header -->
     
        <div class="flex items-center justify-between">
          <button
            @click="prevMonth"
            aria-label="Previous month"
          >
            <img :src="ArrowLeftIcon" alt="Previous" >
          </button>
          <h2 class="label_1_medium primary_text_color">{{ monthYearLabel }}</h2>
          <button
            @click="nextMonth"
            aria-label="Next month"
          >
            <img :src="ArrowRightIcon" alt="Next" >
          </button>
        </div>
         
          <!-- Week Days Header -->
          <div class="grid grid-cols-7 gap-1 mt-5xl">
            <div
              v-for="day in weekDays"
              :key="day"
              class="body_3_medium text-center"
            >
              {{ day }}
            </div>
          </div>
         <div class="block h-[1px] w-full bg-black-25 mt-6xl"></div>
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1 mt-6xl">
            <div
              v-for="date in calendarDays"
              :key="date.key"
              @click="!date.isEmpty && date.isCurrentMonth && !date.isPast ? selectDate(date) : null"
              @mouseenter="!date.isEmpty && date.isCurrentMonth && !date.isPast ? hoveredDate = date.fullDate : null"
              @mouseleave="hoveredDate = null"
              class="aspect-square flex items-center justify-center rounded-md transition-colors label_2_medium "
              :class="[
                date.isEmpty ? '' : 
                date.isPast ? 'text-black-50 cursor-not-allowed' :
                date.isCurrentMonth ? 'primary_text_color cursor-pointer hover:bg-gray-25' : 'text-black-50 cursor-not-allowed',
                !date.isEmpty && date.isCurrentMonth && !date.isPast && isDateSelected(date.fullDate) ? 'bg-black-600 text-white hover:bg-black-600' : '',
                !date.isEmpty && date.isCurrentMonth && !date.isPast && !isDateSelected(date.fullDate) && isDateHovered(date.fullDate) ? 'bg-gray-25' : '',
               // !date.isEmpty && date.isCurrentMonth && !date.isPast && !isDateSelected(date.fullDate) && !isDateHovered(date.fullDate) ? 'hover:bg-gray-100' : ''
              ]"
            >
              {{ date.day }}
            </div>
          </div>
        </div>

        <!-- Time Picker (Right Side) for desktop-->
        <div class=" border-l primary_border_color px-5xl pt-6xl pb-md hidden md:block md:w-1/3">
          <h3 class="label_2_medium primary_text_color text-center">Choose Time</h3>
          
          <!-- Time Slots List -->
          <div class=" md:max-h-[330px]  lg:max-h-[280px] md:overflow-y-auto mt-5xl custom-scrollbar-calendar">
            <div
              v-for="time in timeSlots"
              :key="time.value"
              @click="!isTimePast(time.value) ? selectTime(time) : null"
              @mouseenter="!isTimePast(time.value) ? hoveredTime = time.value : null"
              @mouseleave="hoveredTime = null"
              class="py-xl px-6xl mt-xs rounded-lg transition-colors body_3_medium text-center"
              :class="[
                isTimePast(time.value) ? 'disable_text_color cursor-not-allowed' : 'cursor-pointer',
                !isTimePast(time.value) && isTimeSelected(time.value) ? 'bg-black-600 primary_2_text_color' : '',
                !isTimePast(time.value) && !isTimeSelected(time.value) && isTimeHovered(time.value) ? 'bg-gray-25' : '',
                !isTimePast(time.value) && !isTimeSelected(time.value) && !isTimeHovered(time.value) ? 'primary_text_color ' : ''
              ]"
            >
              {{ time.label }}
            </div>
          </div>
        </div>
      </div>

       <div class="block h-[1px] w-full bg-gray-25"></div>
      <!-- Time Zone Section -->
          <div class="p-5xl ">
            <label class="label_2_medium primary_text_color">Time zone</label>
            <div class="relative mt-md">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <img :src="TimeZoneIcon" alt="">
              </div>
              <input
                :value="timeZone"
                type="text"
                class="w-full rounded-lg regular_border_color p-3xl pl-10 label_2_medium primary_text_color bg_secondary_color"
                placeholder="Select time zone"
                readonly
              />
            </div>
          </div>

           <!-- Time Picker (Right Side) for mobile -->
        <div class=" border-l px-5xl pb-5xl md:pb-md block md:hidden">
          <h3 class="label_3_semibold primary_text_color text-center">Choose Time</h3>
          
          <!-- Time Slots List -->
          <!-- Time Slots List -->
          <div class="flex gap-3 overflow-x-auto space-y-1 mt-5xl custom-scrollbar-calendar">
            <div
              v-for="time in timeSlots"
              :key="time.value"
              @click="!isTimePast(time.value) ? selectTime(time) : null"
              @mouseenter="!isTimePast(time.value) ? hoveredTime = time.value : null"
              @mouseleave="hoveredTime = null"
              class="p-xl rounded-lg transition-colors label_2_semibold text-center"
              :class="[
                isTimePast(time.value) ? 'disable_text_color cursor-not-allowed bg_primary_color' : 'cursor-pointer',
                !isTimePast(time.value) && isTimeSelected(time.value) ? 'bg-black-600 primary_2_text_color' : '',
                !isTimePast(time.value) && !isTimeSelected(time.value) && isTimeHovered(time.value) ? 'bg-gray-25' : '',
                !isTimePast(time.value) && !isTimeSelected(time.value) && !isTimeHovered(time.value) ? 'primary_text_color bg_primary_color' : ''
              ]"
            >
             <p class="w-16">{{ time.label }}</p>
            </div>
          </div>
        </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-xl px-5xl pb-5xl">
            <button
              @click="clearSelection"
              class="rounded-lg bg-gray-25 p-xl label_1_semibold primary_text_colorw-24 hidden md:block"
            >
              Clear
            </button>
            <button
              @click="handleClose"
              class="rounded-lg bg-gray-25 p-xl label_1_semibold primary_text_color w-24 block md:hidden"
            >
              Close
            </button>
            <button
              @click="schedule"
              class="rounded-lg bg-black-600 primary_2_text_color label_1_semibold p-xl w-24"
            >
              Schedule
            </button>
          </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import ArrowLeftIcon from "../../assets/images/ArrowLeftIcon.svg";
import ArrowRightIcon from "../../assets/images/ArrowRightIcon.svg";
import CloseIcon from "../../assets/images/CloseIcon.svg";
import TimeZoneIcon from "../../assets/images/TimeZoneIcon.svg";
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  initialDate: {
    type: Date,
    default: null,
  },
  initialTime: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['close', 'schedule']);

// Calendar state
const currentDate = ref(props.initialDate ? new Date(props.initialDate) : new Date());
const selectedDate = ref(props.initialDate ? new Date(props.initialDate) : null);
const hoveredDate = ref(null);

// Time state
const selectedTime = ref(props.initialTime || null);
const hoveredTime = ref(null);

// Live time for time zone display
const currentTime = ref(new Date());
let timeInterval = null;

// Time zone - computed to show live current time
const timeZone = computed(() => {
  const timeString = currentTime.value.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `India Standard Time (${timeString.toLowerCase()})`;
});

// Update time every second
const updateTime = () => {
  currentTime.value = new Date();
};

// Start/stop time updates based on modal open state
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    currentTime.value = new Date();
    timeInterval = setInterval(updateTime, 1000);
  } else {
    if (timeInterval) {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  }
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
});

// Week days (Sunday first to match image)
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Month/Year label
const monthYearLabel = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

// Calendar days - only show current month dates
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  // Get first and last day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const days = [];
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDay.getDay();
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      key: `empty-${i}`,
      day: '',
      isCurrentMonth: false,
      fullDate: null,
      isEmpty: true,
    });
  }

  // Add all days of the current month
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare dates only
  
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const isPast = d < today;
    
    days.push({
      key: day,
      day: day,
      isCurrentMonth: true,
      fullDate: new Date(d),
      isEmpty: false,
      isPast: isPast,
    });
  }

  // Calculate remaining cells to fill the grid (7 columns)
  const totalCells = days.length;
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      days.push({
        key: `empty-end-${i}`,
        day: '',
        isCurrentMonth: false,
        fullDate: null,
        isEmpty: true,
      });
    }
  }

  return days;
});

// Time slots (12:00 AM to 11:30 PM)
const timeSlots = computed(() => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour % 12 || 12;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const m = `:${String(minute).padStart(2, '0')}`;
      slots.push({
        value: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        label: `${h}${m} ${ampm}`,
      });
    }
  }
  return slots;
});

// Check if date is selected
const isDateSelected = (date) => {
  if (!selectedDate.value) return false;
  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

// Check if date is hovered
const isDateHovered = (date) => {
  if (!hoveredDate.value) return false;
  return (
    date.getDate() === hoveredDate.value.getDate() &&
    date.getMonth() === hoveredDate.value.getMonth() &&
    date.getFullYear() === hoveredDate.value.getFullYear()
  );
};

// Check if time is selected
const isTimeSelected = (time) => {
  return selectedTime.value === time;
};

// Check if time is hovered
const isTimeHovered = (time) => {
  return hoveredTime.value === time;
};

// Select date
const selectDate = (date) => {
  if (date.isCurrentMonth && !date.isPast) {
    selectedDate.value = new Date(date.fullDate);
    // If selected date is today, clear time if it's in the past
    if (isToday(date.fullDate) && selectedTime.value) {
      if (isTimePast(selectedTime.value)) {
        selectedTime.value = null;
      }
    }
  }
};

// Check if a time is in the past (for today's date)
const isTimePast = (timeValue) => {
  return isTimePastForDate(timeValue, selectedDate.value);
};

// Check if selected date is today
const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Select time
const selectTime = (time) => {
  // Don't allow selecting past times for today
  if (!isTimePast(time.value)) {
    selectedTime.value = time.value;
  }
};

// Month navigation
const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

// Handle close button click
const handleClose = () => {
  emit('close');
};

// Clear selection
const clearSelection = () => {
  // Reset to today (not null) so user can still select
  const today = new Date();
  selectedDate.value = new Date(today);
  selectedTime.value = null;
};

// Schedule
const schedule = () => {
  if (selectedDate.value && selectedTime.value) {
    // Validate that date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(selectedDate.value);
    selectedDateOnly.setHours(0, 0, 0, 0);
    
    if (selectedDateOnly < today) {
      return; // Don't schedule past dates
    }
    
    // Validate that time is not in the past for today
    if (selectedDateOnly.getTime() === today.getTime() && isTimePast(selectedTime.value)) {
      return; // Don't schedule past times for today
    }
    
    emit('schedule', {
      date: selectedDate.value,
      time: selectedTime.value,
      timeZone: timeZone.value,
    });
    // Don't close immediately - let parent handle it
    emit('close');
  }else {
    // Incomplete selection - could show error or ignore
    alert("Please select both date and time before scheduling.");
  }
};

// Helper to check if time is past for a given date
const isTimePastForDate = (timeValue, date) => {
  if (!date) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  // Only check if date is today
  if (checkDate.getTime() !== today.getTime()) {
    return false;
  }
  
  // Parse time value (HH:mm format)
  const [hours, minutes] = timeValue.split(':').map(Number);
  const timeDate = new Date();
  timeDate.setHours(hours, minutes, 0, 0);
  
  const now = new Date();
  return timeDate < now;
};

// Watch for modal open to reset state
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    if (props.initialDate) {
      const initialDate = new Date(props.initialDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(initialDate);
      checkDate.setHours(0, 0, 0, 0);
      
      // Only set date if it's not in the past
      if (checkDate >= today) {
        currentDate.value = initialDate;
        selectedDate.value = new Date(initialDate);
      } else {
        // If initial date is past, set to today
        currentDate.value = new Date();
        selectedDate.value = new Date();
      }
    } else {
      currentDate.value = new Date();
      selectedDate.value = new Date(); // Default to today
    }
    
    // Set initial time, but clear it if it's in the past for today
    if (props.initialTime && selectedDate.value) {
      // Check if time is past for the selected date
      if (!isTimePastForDate(props.initialTime, selectedDate.value)) {
        selectedTime.value = props.initialTime;
      } else {
        selectedTime.value = null;
      }
    } else {
      selectedTime.value = null;
    }
  }
});

// Watch for initialDate changes
watch(() => props.initialDate, (newDate) => {
  if (newDate && props.open) {
    currentDate.value = new Date(newDate);
    selectedDate.value = new Date(newDate);
  }
});

// Watch for initialTime changes
watch(() => props.initialTime, (newTime) => {
  if (newTime && props.open) {
    selectedTime.value = newTime;
  }
});
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>


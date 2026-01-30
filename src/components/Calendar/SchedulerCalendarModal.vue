<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-[60] flex items-center justify-center lg:justify-end lg:mr-10"
    @click="$emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-full md:max-w-2xl lg:max-w-lg mx-4 lg:mx-0 bg_white rounded-lg ring-1 ring-black/5 shadow-2xl"
      @click.stop
    >
     

      <!-- Date and Time Picker Container -->
      <div class="flex flex-col lg:flex-row ">
        <!-- Date Picker (Left Side) -->
        <div class="common_inner_gap px-5 pt-5 pb-2 w-2/3">
           <!-- Header -->
     
        <div class="flex items-center justify-between">
          <button
            @click="prevMonth"
            aria-label="Previous month"
          >
            <img :src="ArrowLeftIcon" alt="Previous" >
          </button>
          <h2 class="label_1_semibold">{{ monthYearLabel }}</h2>
          <button
            @click="nextMonth"
            aria-label="Next month"
          >
            <img :src="ArrowRightIcon" alt="Next" >
          </button>
        </div>
         
          <!-- Week Days Header -->
          <div class="grid grid-cols-7 gap-1 common_gap">
            <div
              v-for="day in weekDays"
              :key="day"
              class="body_3_medium seconary_title_text_color text-center"
            >
              {{ day }}
            </div>
          </div>
         <div class="block h-[1px] w-full hr_calendar_bg medium_gap"></div>
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1 regular_gap">
            <div
              v-for="date in calendarDays"
              :key="date.key"
              @click="!date.isEmpty && date.isCurrentMonth && !date.isPast ? selectDate(date) : null"
              @mouseenter="!date.isEmpty && date.isCurrentMonth && !date.isPast ? hoveredDate = date.fullDate : null"
              @mouseleave="hoveredDate = null"
              class="aspect-square flex items-center justify-center rounded-md transition-colors label_2_medium"
              :class="[
                date.isEmpty ? '' : 
                date.isPast ? 'disable_text_color cursor-not-allowed' :
                date.isCurrentMonth ? 'primary_text_color cursor-pointer' : 'disable_text_color cursor-not-allowed',
                !date.isEmpty && date.isCurrentMonth && !date.isPast && isDateSelected(date.fullDate) ? 'bg_brand_color text-white' : '',
                !date.isEmpty && date.isCurrentMonth && !date.isPast && !isDateSelected(date.fullDate) && isDateHovered(date.fullDate) ? 'secondary_bg_color' : '',
               // !date.isEmpty && date.isCurrentMonth && !date.isPast && !isDateSelected(date.fullDate) && !isDateHovered(date.fullDate) ? 'hover:bg-gray-100' : ''
              ]"
            >
              {{ date.day }}
            </div>
          </div>
        </div>

        <!-- Time Picker (Right Side) -->
        <div class=" border-l px-5 pt-5 pb-2 w-1/3">
          <h3 class="label_1_semibold">Choose Time</h3>
          
          <!-- Time Slots List -->
          <div class="max-h-[280px] overflow-y-auto hide-scrollbar space-y-1 common_gap">
            <div
              v-for="time in timeSlots"
              :key="time.value"
              @click="selectTime(time.value)"
              @mouseenter="hoveredTime = time.value"
              @mouseleave="hoveredTime = null"
              class="medium_inner_gap rounded-lg cursor-pointer transition-colors label_2_semibold text-center"
              :class="[
                isTimeSelected(time.value) ? 'bg_brand_color text-white' : '',
                !isTimeSelected(time.value) && isTimeHovered(time.value) ? 'secondary_bg_color primary_hover_text_color' : '',
                !isTimeSelected(time.value) && !isTimeHovered(time.value) ? 'primary_text_color bg_primary_color' : ''
              ]"
            >
              {{ time.label }}
            </div>
          </div>
        </div>
      </div>

       <div class="block h-[1px] w-full hr_calendar_bg"></div>
      <!-- Time Zone Section -->
          <div class="common_inner_gap ">
            <label class="label_2_medium primary_text_color">Time zone</label>
            <div class="relative medium_gap">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <img :src="TimeZoneIcon" alt="">
              </div>
              <input
                :value="timeZone"
                type="text"
                class="w-full rounded-lg primary_border_color medium_inner_gap pl-10 label_2_medium primary_text_color bg_white"
                placeholder="Select time zone"
                readonly
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 px-5 pb-5 ">
            <button
              @click="clearSelection"
              class="flex-1 px-4 py-2 rounded-lg bg-white primary_border_color label_2_semibold secondary_text_color hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              @click="schedule"
              class="flex-1 px-4 py-2 rounded-lg bg-[#7950F2] text-white label_2_semibold hover:bg-[#6E5DC6] transition-colors"
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
  if (date.isCurrentMonth) {
    selectedDate.value = new Date(date.fullDate);
  }
};

// Select time
const selectTime = (time) => {
  selectedTime.value = time;
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

// Clear selection
const clearSelection = () => {
  selectedDate.value = null;
  selectedTime.value = null;
};

// Schedule
const schedule = () => {
  if (selectedDate.value && selectedTime.value) {
    emit('schedule', {
      date: selectedDate.value,
      time: selectedTime.value,
      timeZone: timeZone.value,
    });
    // Don't close immediately - let parent handle it
    emit('close');
  }
};

// Watch for modal open to reset state
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    if (props.initialDate) {
      currentDate.value = new Date(props.initialDate);
      selectedDate.value = new Date(props.initialDate);
    } else {
      currentDate.value = new Date();
      selectedDate.value = null;
    }
    selectedTime.value = props.initialTime || null;
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


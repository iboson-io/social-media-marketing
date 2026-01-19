<template>
  <main class="flex-1 bg_primary_color  px-4 py-12 md:px-10 lg:py-7">
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl bg_white common_inner_gap primary_border_color">
      <h2 class="primary_text_color heading_h6_bold">Calendar</h2>
      <p class="label_1_regular regular_gap">
        Manage your brands, connect their channels, and keep assets in one place.
      </p>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between rounded-xl bg_white p-3  flex-col-reverse gap-4 md:gap-0 md:flex-row">
      <!-- View Switch -->
      <div class="flex rounded-full bg_secondary_color primary_border_color p-1">
        <button
          v-for="view in views"
          :key="view"
          @click="activeView = view"
          class="rounded-full primary_border_color px-4 py-1 label_2_semibold primary_text_color"
          :class="
            activeView === view
              ? 'bg_white '
              : ''
          "
        >
          {{ view }}
        </button>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <img :src="ProductIcon" alt="" class="mr-[-40px] md:mr-[-44px] z-10">
        <div class="relative">
        <select
          v-model="selectedProduct"
          class="flex items-center gap-2 rounded-md primary_border_color pl-8 pr-10 md:pl-10 md:pr-14 py-2 label_2_medium bg_white appearance-none"
        >
          <option value="single">Single</option>
          <option value="multi">Multi</option>
          <option value="all">All products</option>
        </select>
        <img :src="DownArrow" alt="" class="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        </div>
        <button class="rounded-md px-4 py-2 primary_add_button flex items-center">
          <img :src="WhitePlusIcon"  alt="" class="mr-2"> Create new post
        </button>
      </div>
    </div>

    <!-- MONTH VIEW -->
    <div
      v-if="activeView === 'Month'"
      class="rounded-xl bg_white primary_border_color "
    >
      <!-- Month Header -->
      <div class="flex items-center justify-between border-b p-4">
        <button @click="prevMonth"><img :src="CircleLeftArrow" alt=""></button>
        <p class="heading_h6_semibold primary_text_color">{{ monthYear }}</p>
        <button @click="nextMonth"><img :src="CircleRightArrow" alt=""></button>
      </div>

      <!-- Week Days -->
      <div class="grid grid-cols-7 border-b text-center bg_primary_color">
        <div v-for="day in weekDays" :key="day" class="py-2 paragraph_p7_medium">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7">
        <div
          v-for="date in calendarDays"
          :key="date.key"
          class="h-14 md:h-[4.8em] secondary_button_border p-2 "
          :class="[
            date.isToday ? 'secondary_bg_color border-[#7048E8]' : '',
            !date.isCurrentMonth ? 'bg_white' : ''
          ]"
        >
          <p class="text-right paragraph_p5_medium"
           :class="date.isCurrentMonth ? 'primary_text_color' : 'disable_text_color'"
          >
            {{ date.day }}
          </p>

        </div>
      </div>
    </div>

    <!-- WEEK VIEW -->
    <div
      v-if="activeView === 'Week'"
      class="rounded-xl bg_white  shadow"
    >
      <div class="flex items-center justify-between border-b p-4">
  <button @click="prevWeek"><img :src="CircleLeftArrow" alt=""></button>
  <p class="heading_h6_semibold primary_text_color">{{ monthYear }}</p>
  <button @click="nextWeek"> <img :src="CircleRightArrow" alt=""></button>
</div>


     <!-- Week Header -->
<div class="grid grid-cols-7 border-b bg_primary_color">
  <div
    v-for="day in weekDaysOnly"
    :key="day.day"
    class="p-3 md:common_inner_gap text-center "
    :class="day.isToday ? 'bg-blue-100' : ''"
  >
    <p
      class="heading_h5_semibold"
      :class="day.isToday ? 'secondary_text_color' : ''"
    >
      {{ day.dateNumber }}
    </p>

    <p class="label_3_medium">
      {{ day.dayLabel }}
    </p>
  </div>
</div>


      <div class="space-y-2 overflow-auto h-[64vh] md:h-[47vh] hide-scrollbar">
        <div
          v-for="hour in 24"
          :key="hour"
          class="flex h-24 items-center border-b label_2_regular ml-1"
        >
          {{ formatHour(hour) }}
        </div>
      </div>
    </div>

    <!-- DAY VIEW -->
    <div
  v-if="activeView === 'Day'"
  class="rounded-xl bg_white primary_border_color shadow"
>

  <!-- Day Header -->
<div class="flex items-center justify-between border-b p-4">
  <button @click="prevDay"><img :src="CircleLeftArrow" alt=""></button>

  <p class="heading_h6_semibold primary_text_color">
    {{ fullDate }}
  </p>

  <button @click="nextDay"><img :src="CircleRightArrow" alt=""></button>
</div>


  
  <div class="mb-6 flex flex-col items-start justify-center border-b px-2 py-5 bg_primary_color">
    <p class="heading_h5_semibold ml-1">
      {{ dayNumber }}
    </p>
    <p class="label_3_medium ml-1">
      {{ dayShort }}
    </p>
  </div>

  <!-- Hours -->
  <div class="space-y-2  overflow-auto h-[60vh] md:h-[44vh] hide-scrollbar">
    <div
      v-for="hour in 24"
      :key="hour"
      class="flex h-24 items-center  border-b label_2_regular ml-1"
    >
      {{ formatHour(hour) }}
    </div>
  </div>
</div>

  </div>

  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductIcon from "../../assets/images/ProductIcon.svg"
import WhitePlusIcon from "../../assets/images/WhitePlusIcon.svg"
import CircleLeftArrow from "../../assets/images/CircleLeftArrow.svg"
import CircleRightArrow from "../../assets/images/CircleRightArrow.svg"
import DownArrow from "../../assets/images/DownArrow.svg"

const selectedTime = ref(null);

/* Views */
const views = ["Day", "Week", "Month"];
const activeView = ref("Month");



/* Selected Product */
const selectedProduct = ref("all");

/* Date State */
const currentDate = ref(new Date());

/* Helpers */
const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/* Month Label */
const monthYear = computed(() =>
  currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
);

/* Month Navigation */
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





// week navigation
const prevWeek = () => {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() - 7);
  currentDate.value = d;
};

const nextWeek = () => {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() + 7);
  currentDate.value = d;
};


const weekDaysOnly = computed(() => {
  const start = new Date(currentDate.value);
  start.setDate(start.getDate() - start.getDay()); // start from Sunday

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const today = new Date();

    return {
      day: date.toDateString(), // unique key
      dateNumber: date.getDate(), // 16
      dayLabel: date.toLocaleDateString("en-US", { weekday: "short" }), // Thu
      dateLabel: date.getDate(), // if you want only number
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  });
});



// day nagigation

/* Previous Day */
const prevDay = () => {
  const date = new Date(currentDate.value);
  date.setDate(date.getDate() - 1);
  currentDate.value = date;
};

/* Next Day */
const nextDay = () => {
  const date = new Date(currentDate.value);
  date.setDate(date.getDate() + 1);
  currentDate.value = date;
};

/* Full Date Label */
const fullDate = computed(() =>
  currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);

const dayNumber = computed(() =>
  currentDate.value.getDate()
);

const dayShort = computed(() =>
  currentDate.value.toLocaleDateString("en-US", {
    weekday: "short",
  })
);


/* Calendar Grid */
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const diff = (dayOfWeek + 6) % 7; // days to go back to Monday
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - diff);

  const days = [];
  const today = new Date();

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    const isCurrentMonth = d.getMonth() === month;

    days.push({
      key: i,
      day: d.getDate(),
      isToday,
      isCurrentMonth,
      fullDate: new Date(d),
    });
  }

  return days;
});

/* Week View */
const currentWeek = computed(() => {
  const start = new Date(currentDate.value);
  const day = start.getDay();
  const diff = start.getDate() - (day === 0 ? 6 : day - 1);
  start.setDate(diff);

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: date.toLocaleDateString(),
    };
  });
});



/* Format Hour */
const formatHour = (hour) => {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h}:00 ${ampm}`;
};


const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
];



const clearPopup = () => {
  selectedDate.value = null;
  selectedTime.value = null;
};



</script>

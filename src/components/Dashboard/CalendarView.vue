<template>
  <main class="flex-1 bg_primary_color  px-6 py-10">
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl bg_primary_color p-6 shadow primary_border_color">
      <h2 class="primary_text_color heading_h6_bold">Calendar</h2>
      <p class="label_1_regular">
        Manage your brands, connect their channels, and keep assets in one place.
      </p>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between rounded-xl bg_white p-4 shadow">
      <!-- View Switch -->
      <div class="flex rounded-full bg_secondary_color primary_border_color p-1">
        <button
          v-for="view in views"
          :key="view"
          @click="activeView = view"
          class="rounded-full primary_border_color px-4 py-1 label_2_semibold"
          :class="
            activeView === view
              ? 'bg_white shadow'
              : ''
          "
        >
          {{ view }}
        </button>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <img :src="ProductIcon" alt="" class="mr-[-12px]">
        <select
          v-model="selectedProduct"
          class="flex items-center gap-2 rounded-md primary_border_color px-3 py-2 label_2_medium bg_white"
        >
          <option value="single">Single</option>
          <option value="multi">Multi</option>
          <option value="all">All products</option>
        </select>

        <button class="rounded-md px-4 py-2 primary_button flex items-center" @click="showPopup = true">
          <img :src="WhitePlusIcon"  alt="" class="mr-2"> Create new post
        </button>
      </div>
    </div>

    <!-- MONTH VIEW -->
    <div
      v-if="activeView === 'Month'"
      class="rounded-xl bg_white shadow primary_border_color"
    >
      <!-- Month Header -->
      <div class="flex items-center justify-between border-b p-4">
        <button @click="prevMonth">‹</button>
        <p class="heading_h6_semibold primary_text_color">{{ monthYear }}</p>
        <button @click="nextMonth">›</button>
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
          class="h-20 border p-2 "
          :class="[
            date.isToday ? 'secondary_bg_color border-[#7048E8]' : '',
            !date.isCurrentMonth ? 'bg_white' : ''
          ]"
        >
          <p class="text-right paragraph_p5_medium">
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
  <button @click="prevWeek">‹</button>
  <p class="heading_h6_semibold primary_text_color">{{ monthYear }}</p>
  <button @click="nextWeek">›</button>
</div>


     <!-- Week Header -->
<div class="grid grid-cols-7 border-b bg_primary_color">
  <div
    v-for="day in weekDaysOnly"
    :key="day.day"
    class="py-3 text-center "
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


      <div class="space-y-2">
        <div
          v-for="hour in 24"
          :key="hour"
          class="flex h-12 items-center border-b label_2_regular ml-1"
        >
          {{ hour }}:00
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
  <button @click="prevDay">‹</button>

  <p class="heading_h6_semibold primary_text_color">
    {{ fullDate }}
  </p>

  <button @click="nextDay">›</button>
</div>


  
  <div class="mb-6 flex flex-col items-start justify-center border-b pb-2 pt-2 bg_primary_color">
    <p class="heading_h5_semibold ml-1">
      {{ dayNumber }}
    </p>
    <p class="label_3_medium ml-1">
      {{ dayShort }}
    </p>
  </div>

  <!-- Hours -->
  <div class="space-y-2">
    <div
      v-for="hour in 24"
      :key="hour"
      class="flex h-12 items-center border-b label_2_regular ml-1"
    >
      {{ hour }}:00
    </div>
  </div>
</div>

  </div>

  <!-- Popup for Create New Post -->
  <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="mb-4">Create New Post</h2>
      <p class="mb-4">Selected Date: {{ selectedDate ? selectedDate.toLocaleDateString() : 'None' }}</p>
      
      <!-- Mini Calendar -->
      <div class="mb-4">
        <h3 class="text-md font-semibold mb-2">{{ monthYear }}</h3>
        <div class="grid grid-cols-7 gap-1 label_2_regular">
          <div v-for="day in weekDays" :key="day" class="label_2_regular">{{ day }}</div>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="date in calendarDays"
            :key="date.key"
            class="py-2 text-center cursor-pointer "
            :class="[
              date.isToday ? 'bg-purple-50 border-purple-300' : '',
              !date.isCurrentMonth ? 'text-gray-400 bg-gray-50' : '',
              selectedDate && date.fullDate && selectedDate.getTime() === date.fullDate.getTime() ? 'bg-blue-200' : ''
            ]"
            @click="selectDate(date)"
          >
            {{ date.day }}
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-2">
        <button @click="showPopup = false" class="px-4 py-2 label_2_regular rounded primary_border_color">Cancel</button>
        <button @click="createPost" class="primary_button w-20">Create</button>
      </div>
    </div>
  </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductIcon from "../../assets/images/ProductIcon.svg"
import WhitePlusIcon from "../../assets/images/WhitePlusIcon.svg"

/* Views */
const views = ["Day", "Week", "Month"];
const activeView = ref("Month");

/* Popup */
const showPopup = ref(false);
const selectedDate = ref(null);

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

/* Select Date */
const selectDate = (date) => {
  selectedDate.value = date.fullDate;
};

/* Create Post */
const createPost = () => {
  if (selectedDate.value) {
    alert(`Post created for ${selectedDate.value.toLocaleDateString()}`);
    showPopup.value = false;
    selectedDate.value = null;
  } else {
    alert('Please select a date');
  }
};

</script>

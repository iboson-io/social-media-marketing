<template>
  <!-- Backdrop -->
  <div
    v-if="open"
    class="fixed inset-0 z-50 bg_overlay"
    @click="$emit('close')"
  >
    <!-- Modal - Positioned on the right -->
    <div
      class="fixed right-0 bottom-0 w-full top-0 hide-scrollbar md:max-w-lg  max-h-screen overflow-y-auto bg_secondary_color shadow-2xl"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg_primary_color  px-6xl py-6xl flex  z-10">
        <h2 class="heading_h6_semibold primary_text_color">View post</h2>
        <button
          @click="$emit('close')"
          class="absolute right-6 primary_text_color leading-none p-xl bg-gray-25 rounded-lg"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9M1 1L9 9" stroke="#28293D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
      </div>

      <!-- Content -->
      <div class="pb-6xl px-6xl bg_primary_color">
        <!-- Performance Banner -->
        <div 
          class="rounded-2xl p-[1px]"
          style="background: linear-gradient(124.88deg, #9966FF 18.51%, #0073E6 38.28%, #FAB000 57.61%, #15BE53 76.05%);"
        >
          <div class="bg_secondary_color rounded-2xl px-xl py-3xl flex items-center justify-center">
            <img :src="LogoImage" alt="" class="h-7 ">
            <span class="label_2_semibold primary_text_color">
              This post performed 38% better than your average image post.
            </span>
          </div>
        </div>
      <div class="bg_secondary_color p-5xl rounded-2xl mt-6xl">
        <!-- Status and Post Type -->
        <div class="flex justify-between gap-3xl justify-center">
          <span
            class="rounded-lg px-md py-xxl label_2_semibold flex items-center gap-xs w-36 md:min-w-56"
            :class="statusClass(postData?.status)"
          >
            <img :src="PublishIcon" alt="">
            {{ postData?.status || 'Published' }}
          </span>
          <div class="relative platform-dropdown-container">
            <button
              @click.stop="togglePlatformDropdown"
              class="flex items-center gap-6xl md:gap-md px-md py-xxl label_2_semibold primary_text_color primary_border_color rounded-lg"
            >
              <img :src="PostFilter" alt="">
              <span class="hidden md:block">{{ getPostType() }}</span>
              <img :src="DownArrow" alt="" class="h-4 w-4" />
            </button>
            
            <!-- Platform Dropdown -->
            <div
              v-if="showPlatformDropdown"
              class="absolute right-0 md:left-0 top-8 z-50 min-w-[180px] rounded-lg bg_secondary_color shadow-lg primary_border_color py-md"
            >
              <div
                v-for="platform in availablePlatforms"
                :key="platform"
                @click.stop="selectPlatform(platform)"
                class="px-3xl py-xl hover:bg-gray-25 cursor-pointer body_3_medium"
                :class="selectedPlatform === platform ? 'body_3_medium' : ''"
              >
                {{ platform }} post (4:5)
              </div>
            </div>
          </div>
        </div>

        <!-- Post Image -->
        <div class="rounded-lg overflow-hidden bg_secondary_color flex justify-center mt-lg">
          <img
            :src="postData?.image"
            :alt="postData?.title"
            class="w-[30em] object-cover"
          />
        </div>

        <!-- Caption -->
        <div class="mt-xl">
          <p class="body_1_regular primary_text_color mt-xl" v-html="getFullCaption()">
          </p>
        </div>
         <div class="block h-[1px] w-full bg-gray-25 mt-5xl"></div>
        <!-- Date/Time -->
         <p class="label_2_semibold secondary_text_color mt-5xl">Date/Time</p>
        <div class="body_1_regular primary_text_color mt-xxs">
          {{ formatDateTime() }}
        </div>
      </div>
        <!-- Metrics Grid -->
        <div class=" flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid grid-cols-1 gap-5xl lg:grid-cols-2 mt-6xl">

        <AnalyticsStatCard
          v-for="(stat, index) in stats"
          :key="index"
          v-bind="stat"
        />
        </div>

        <!-- Repost Button -->
        <button
          @click="handleRepost"
          class="w-full primary_button label_1_semibold flex items-center justify-center gap-md  rounded-lg mt-5xl"
        >
          <img :src="RepostBottonIcon" alt="">
          Repost
        </button>
      </div>
    </div>
  </div>

  <!-- Post Scheduled Modal -->
  <PostScheduledModal
    :open="showScheduledModal"
    :scheduledDate="scheduledDate"
    @close="closeScheduledModal"
    @viewCalendar="handleViewCalendar"
  />

  <!-- Repost Modal - Right Side Panel -->
  <div
    v-if="showRepostModal"
    class="fixed inset-0 z-[60] bg_overlay"
    @click="closeRepostModal"
  >
    <!-- Modal - Positioned on the right -->
    <div
      class="fixed right-0 bottom-0 w-full top-0 hide-scrollbar md:max-w-lg max-h-screen overflow-y-auto bg_secondary_color shadow-2xl bg_primary_color"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg_primary_color px-6xl py-6xl flex items-center justify-between z-10">
        <h2 class="heading_h6_semibold primary_text_color">View post</h2>
        <button
          @click="closeRepostModal"
          class="p-md border primary_border_color hover:bg-black-25 rounded-lg transition-colors"
          aria-label="Close"
        >
          <img :src="closeIcon" alt="">
        </button>
      </div>

      <!-- Content -->
      <div class="px-6xl pb-6xl bg_primary_color">
        <!-- Post Detail Content with Auto Scroll -->
        <div class="flex-1 overflow-y-auto primary_border_color p-5xl rounded-lg custom-scrollbar-calendar bg_secondary_color">
          <!-- Post Type Dropdown -->
          <div class="relative">
            <img :src="PostFilter" class="absolute left-2 top-[10px]" alt="">
            <select
              v-model="repostPostType"
              class="w-full rounded-lg regular_border_color p-md label_2_medium primary_text_color bg_secondary_color appearance-none pl-9xl"
            >
              <option value="Instagram post (4:5)">Instagram post (4:5)</option>
              <option value="Instagram post (1:1)">Instagram post (1:1)</option>
              <option value="Instagram post (9:16)">Instagram post (9:16)</option>
              <option value="Facebook post (4:5)">Facebook post (4:5)</option>
              <option value="LinkedIn post (4:5)">LinkedIn post (4:5)</option>
              <option value="Twitter post (16:9)">Twitter post (16:9)</option>
            </select>
            <img :src="DownArrow" alt="" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          </div>

          <!-- Image Preview -->
          <div class="rounded-lg overflow-hidden bg_primary_color flex justify-center items-center mt-xl h-72">
            <img
              :src="postData?.image || postData?.postImage"
              :alt="postData?.title"
              class="w-full max-w-md object-contain"
            />
          </div>
        </div>
          <!-- Caption -->
           <div class="flex mt-6xl items-center gap-md">
            <p class="label_2_semibold primary_text_color">Label</p> 
            <img :src="Iicon" alt="" class="w-5 h-5">
           </div>
          
          <div class="relative mt-md">
            <textarea
              v-model="repostCaption"
              class="w-full rounded-lg primary_border_color p-xl label_1_regular primary_text_color bg_secondary_color min-h-[140px] resize-none"
              placeholder="Write your caption here..."
            ></textarea>
            <!-- AI Sparkle Icon -->
            <button class="absolute bottom-3 right-3 p-md">
              <img :src="AiIcon" alt="">
            </button>
          </div>

          <!-- Platforms -->
          <p class="label_2_medium primary_text_color mt-6xl">Platforms</p>
          <div class="flex items-center gap-xl mt-md overflow-auto hide-scrollbar">
            <img
              v-for="platform in repostPlatforms"
              :key="platform"
              :src="getPlatformIcon(platform)"
              :alt="platform"
              class="w-10 h-10"
            />
            <img
              @click="openRepostPlatformModal"
              :src="ImageEditIcon"
              alt=""
              class="primary_border_color rounded-lg p-md cursor-pointer w-10 h-10"
            >
          </div>

          <!-- Scheduled For -->
          <div class="mt-6xl p-3xl primary_border_color rounded-lg bg_secondary_color">
            <p
              class="flex justify-between"
              v-html="formatRepostScheduledTime()"
              @click="handleRepostTimeClick"
            ></p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-6xl mt-6xl relative">
            <button
              @click="handleSchedulePost"
              class="w-full primary_button label_1_semibold flex items-center justify-center gap-md rounded-lg"
            >
              <img :src="CalendarIconWhite" alt="">
              Schedule post
            </button>
          </div>
        
      </div>
    </div>
  </div>

  <!-- Social Media Platform Modal -->
  <SocialMediaModal
    :open="showRepostPlatformModal"
    :selected-platforms="repostPlatforms"
    @close="closeRepostPlatformModal"
    @update:selected-platforms="updateRepostPlatforms"
  />

  <!-- Scheduler Calendar Modal -->
  <SchedulerCalendarModal
    :open="showRepostSchedulerModal"
    :initial-date="repostSchedulerInitialDate"
    :initial-time="repostSchedulerInitialTime"
    @close="closeRepostSchedulerModal"
    @schedule="handleRepostSchedule"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import PostScheduledModal from './PostScheduledModal.vue';
import AnalyticsStatCard from "./AnalyticsCard.vue"
import SocialMediaModal from '../../Calendar/SocialMediaModal.vue';
import SchedulerCalendarModal from '../../Calendar/SchedulerCalendarModal.vue';
import LogoImage from '../../../assets/images/LogoImage.png';
import PublishIcon from '../../../assets/images/PublishIcon.svg';
import DownArrow from '../../../assets/images/DownArrow.svg';
import PostFilter from '../../../assets/images/PostFilter.svg';
import TotalReach from '../../../assets/images/TotalReach.svg';
import MessageIcon from '../../../assets/images/MessageIcon.svg';
import LikeIcon from '../../../assets/images/LikeIcon.svg';
import CommentIcon from '../../../assets/images/CommentIcon.svg';
import RepostBottonIcon from "../../../assets/images/RepostBottonIcon.svg";
import AiIcon from '../../../assets/images/AiIcon.svg';
import ImageEditIcon from '../../../assets/images/ImageEditIcon.svg';
import CalendarIconWhite from '../../../assets/images/CalendarIconWhite.svg';
import SaveIcon from '../../../assets/images/SaveIcon.svg';
import closeIcon from '../../../assets/images/BlackCloseIcon.svg';
import InstagramIcon from '../../../assets/images/InstagramIcon.svg';
import FacebookIcon from '../../../assets/images/FacebookIcon.svg';
import LinkedInIcon from '../../../assets/images/LinkedInIcon.svg';
import TwitterIcon from '../../../assets/images/TwitterIcon.svg';
import TikTokIcon from '../../../assets/images/TikTokIcon.svg';
import YoutubeIcon from '../../../assets/images/YoutubeIcon.svg';
import Iicon from '../../../assets/images/Iicon.svg';


const props = defineProps({
  open: Boolean,
  postData: Object,
});

const emit = defineEmits(['close', 'repost', 'viewCalendar']);

const showScheduledModal = ref(false);
const showPlatformDropdown = ref(false);
const selectedPlatform = ref(null);
const showRepostModal = ref(false);
const repostPostType = ref('Instagram post (4:5)');
const repostCaption = ref('');
const repostPlatforms = ref([]);
const repostScheduledDate = ref(null); // Date object
const repostScheduledTime = ref('00:00'); // HH:mm format
const originalRepostData = ref(null); // Store original repost data to track changes
const hasRepostUnsavedChanges = ref(false); // Track if there are unsaved changes
const showRepostPlatformModal = ref(false); // State for platform modal
const showRepostSchedulerModal = ref(false); // State for scheduler modal
const repostSchedulerInitialDate = ref(null); // Initial date for scheduler
const repostSchedulerInitialTime = ref(null); // Initial time for scheduler

const statusClass = (status) => {
  if (status === 'Published') return ' bg-blue-25 text-blue-200';
  if (status === 'Pending') return 'bg-warning-50 text-warning-500';
  if (status === 'Approved') return 'bg-success-50 text-success-800';
  return 'bg-blue-25 text-blue-200';
};

const availablePlatforms = computed(() => {
  return props.postData?.platforms || ['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok', 'YouTube'];
});

const getPostType = () => {
  const platform = selectedPlatform.value || availablePlatforms.value[0] || 'Instagram';
  return `${platform} post (4:5)`;
};

const togglePlatformDropdown = () => {
  showPlatformDropdown.value = !showPlatformDropdown.value;
};

const selectPlatform = (platform) => {
  selectedPlatform.value = platform;
  showPlatformDropdown.value = false;
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.platform-dropdown-container')) {
    showPlatformDropdown.value = false;
  }
};

const getFullCaption = () => {
  const title = props.postData?.title || 'Big Sale this weekend!';
  const caption = `${title} Don't miss your chance to grab your favorites at exclusive prices. #WeekendSale #LimitedOffer #ShopSmart`;
  
  // Replace hashtags with styled spans
  return caption.replace(/#(\w+)/g, '<span class="hashtag_text_color">#$1</span>');
};

const formatDateTime = () => {
  const date = props.postData?.date || 'Oct 28,';
  const time = props.postData?.time || '10:00 AM';
  return `${date} ${time}`;
};

const getMetricValue = (type) => {
  const metrics = {
    reach: props.postData?.reach || '128K',
    engagement: props.postData?.engagement || '6.8%',
    likes: props.postData?.likes || '3.2K',
    comments: props.postData?.comments || '210',
  };
  return metrics[type] || '0';
};

const scheduledDate = computed(() => {
  // Format: "Oct 30 at 10:00 AM"
  const date = props.postData?.date?.replace(',', '') || 'Oct 30';
  const time = props.postData?.time || '10:00 AM';
  return `${date} at ${time}`;
});

// Format date to YYYY-MM-DD
const formatDateToString = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format time from HH:mm to readable format
const formatTime = (timeString) => {
  if (!timeString) return '12:00 AM';
  const [hours, minutes] = timeString.split(':').map(Number);
  const h = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';
  const m = minutes > 0 ? `:${String(minutes).padStart(2, '0')}` : '';
  return `${h}${m} ${ampm}`;
};

// Format scheduled time for repost modal
const formatRepostScheduledTime = () => {
  if (!repostScheduledDate.value) return '';
  
  const date = new Date(repostScheduledDate.value);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  let dateLabel = '';
  if (isToday) {
    dateLabel = 'Today';
  } else if (isTomorrow) {
    dateLabel = 'Tomorrow';
  } else {
    dateLabel = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const timeDisplay = formatTime(repostScheduledTime.value);

  return `<span class="label_2_medium secondary_text_color">Scheduled for </span><span class="body_3_medium primary_text_color cursor-pointer" data-time-clickable="true"> ${dateLabel} <span class="inline-block w-[1px] h-4 mx-1 xl:mx-2 bg-gray-400 align-middle"></span>${timeDisplay}</span>`;
};

const handleRepost = () => {
  // Initialize repost data from postData
  const captionHtml = getFullCaption();
  repostCaption.value = captionHtml.replace(/<[^>]*>/g, ''); // Remove HTML tags
  
  // Normalize platforms to lowercase for icon mapping
  const platforms = props.postData?.platforms || ['instagram', 'facebook', 'tiktok', 'linkedin'];
  repostPlatforms.value = platforms.map(p => typeof p === 'string' ? p.toLowerCase() : p);
  
  repostPostType.value = 'Instagram post (4:5)';
  
  // Set default scheduled time to today at 12:00 AM
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  repostScheduledDate.value = today;
  repostScheduledTime.value = '00:00';
  
  // Store original data for change tracking
  originalRepostData.value = {
    postType: repostPostType.value,
    caption: repostCaption.value,
    platforms: [...repostPlatforms.value],
    scheduledDate: new Date(repostScheduledDate.value),
    scheduledTime: repostScheduledTime.value,
  };
  
  hasRepostUnsavedChanges.value = false;
  
  // Show repost modal
  showRepostModal.value = true;
};

const closeRepostModal = () => {
  showRepostModal.value = false;
  hasRepostUnsavedChanges.value = false;
  originalRepostData.value = null;
};

// Platform modal handlers
const openRepostPlatformModal = () => {
  showRepostPlatformModal.value = true;
};

const closeRepostPlatformModal = () => {
  showRepostPlatformModal.value = false;
};

const updateRepostPlatforms = (platforms) => {
  repostPlatforms.value = platforms;
  checkRepostForChanges();
};

// Scheduler modal handlers
const openRepostSchedulerModal = () => {
  if (repostScheduledDate.value) {
    repostSchedulerInitialDate.value = new Date(repostScheduledDate.value);
    repostSchedulerInitialTime.value = repostScheduledTime.value;
  } else {
    repostSchedulerInitialDate.value = new Date();
    repostSchedulerInitialTime.value = '00:00';
  }
  showRepostSchedulerModal.value = true;
};

const closeRepostSchedulerModal = () => {
  showRepostSchedulerModal.value = false;
};

const handleRepostSchedule = (scheduleData) => {
  const newDate = scheduleData.date;
  const newTime = scheduleData.time;

  repostScheduledDate.value = newDate;
  repostScheduledTime.value = newTime;

  checkRepostForChanges();
};

// Handle click on time in scheduled time display
const handleRepostTimeClick = (event) => {
  if (event.target.dataset.timeClickable === 'true') {
    openRepostSchedulerModal();
  }
};

// Check if there are unsaved changes
const checkRepostForChanges = () => {
  if (!originalRepostData.value) {
    hasRepostUnsavedChanges.value = false;
    return;
  }

  // Check if platforms changed
  const platformsChanged = JSON.stringify(repostPlatforms.value.sort()) !==
    JSON.stringify(originalRepostData.value.platforms.sort());

  // Check if date changed
  const dateChanged = formatDateToString(repostScheduledDate.value) !==
    formatDateToString(originalRepostData.value.scheduledDate);

  // Check if time changed
  const timeChanged = repostScheduledTime.value !== originalRepostData.value.scheduledTime;

  // Check if other fields changed (caption, postType)
  const otherFieldsChanged =
    repostCaption.value !== originalRepostData.value.caption ||
    repostPostType.value !== originalRepostData.value.postType;

  hasRepostUnsavedChanges.value = platformsChanged || dateChanged || timeChanged || otherFieldsChanged;
};

const handleSchedulePost = () => {
  // Emit repost event with the repost data
  emit('repost', {
    ...props.postData,
    postType: repostPostType.value,
    caption: repostCaption.value,
    platforms: repostPlatforms.value,
    postDate: formatDateToString(repostScheduledDate.value),
    postTime: repostScheduledTime.value,
  });

  // Close repost modal and show scheduled confirmation
  closeRepostModal();
  showScheduledModal.value = true;
};

// Watch for changes in repost fields
watch(() => repostCaption.value, () => {
  checkRepostForChanges();
});

watch(() => repostPostType.value, () => {
  checkRepostForChanges();
});

watch(() => repostPlatforms.value, () => {
  checkRepostForChanges();
}, { deep: true });

watch(() => repostScheduledDate.value, () => {
  checkRepostForChanges();
});

watch(() => repostScheduledTime.value, () => {
  checkRepostForChanges();
});

// Get platform icon
const getPlatformIcon = (platform) => {
  const platformMap = {
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    linkedin: LinkedInIcon,
    twitter: TwitterIcon,
    tiktok: TikTokIcon,
    youtube: YoutubeIcon,
  };
  return platformMap[platform.toLowerCase()] || InstagramIcon;
};

const closeScheduledModal = () => {
  showScheduledModal.value = false;
  // Close the view post modal as well
  emit('close');
};

const handleViewCalendar = () => {
  emit('viewCalendar');
};

// Watch for postData changes to update selected platform
watch(() => props.postData, (newData) => {
  if (newData && availablePlatforms.value.length > 0) {
    selectedPlatform.value = availablePlatforms.value[0];
  }
}, { immediate: true });

// Initialize selected platform
onMounted(() => {
  if (availablePlatforms.value.length > 0 && !selectedPlatform.value) {
    selectedPlatform.value = availablePlatforms.value[0];
  }
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});


//analystics 
const baseStats = [
  {
    title: 'Total reach',
    description: 'Total users who saw your posts',
    icon: TotalReach,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    mobileWdth: 'w-[100%]',
    valueMonth: '',
    
  },
  {
    title: 'Engagement rate',
    description: 'Likes, comments, & impressions',
    icon: MessageIcon,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    mobileWdth: 'w-[100%]',
    valueMonth: '',
    
  },
  {
    title: 'Likes',
    description: 'Total reactions',
    icon: LikeIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    mobileWdth: 'w-[100%]',
    valueMonth: '+1,230',
   
  },
  {
    title: 'comments',
    description: 'Total replies',
    icon: CommentIcon,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    mobileWdth: 'w-[100%]',
    valueMonth: '210',
  },
];

const stats = computed(() => {
  // Use 'Month' as default since there's no activeTab in this component
  const defaultTab = 'Month';
  
  return baseStats.map(stat => {
    // Use post data values where available, otherwise use default values
    let value = stat[`value${defaultTab}`];
    
    // Map post data to stats if available
    if (stat.title === 'Total reach' && props.postData?.reach) {
      value = props.postData.reach;
    } else if (stat.title === 'Engagement rate' && props.postData?.engagement) {
      value = props.postData.engagement;
    }
    
    return {
      ...stat,
      value: value
    };
  });
});


</script>


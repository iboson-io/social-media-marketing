<template>
  <div class="overflow-auto rounded-2xl bg_secondary_color primary_border_color mt-4xl lg:overflow-hidden">
    <!-- Table -->
    <table class="w-full border-collapse">
      <!-- Header -->
      <thead class="bg_secondary_color">
        <tr class="text-left label_3_semibold secondary_text_color">
          <th class="px-6xl py-xl">
            <input
              type="checkbox"
              :checked="isAllSelected"
              :indeterminate="isIndeterminate"
              @change="toggleSelectAll"
              class="h-5xl w-5xl cursor-pointer rounded custom-checkbox"
            />
          </th>
          <th class="px-6xl py-xxl">Preview</th>
          <th class="px-6xl py-xxl">Caption / Title</th>
          <th class="px-6xl py-xxl">Platform</th>
          <th class="px-6xl py-xxl">Date / Time</th>
          <th class="px-6xl py-xxl">Reach</th>
          <th class="px-6xl py-xxl">Engagement</th>
          <th class="px-6xl py-xxl">Status</th>
          <th class="px-6xl py-xxl text-center">Actions</th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="border-t primary_border_color hover:bg-gray-25"
        >
          <!-- Checkbox -->
          <td class="px-6xl py-xl">
            <input
              type="checkbox"
              :checked="selectedRows.includes(index)"
              @change="toggleRowSelection(index)"
              class="h-5xl w-5xl cursor-pointer rounded custom-checkbox"
            />
          </td>

          <!-- Preview -->
          <td class="px-6xl py-xl">
            <img
              :src="row.image"
              class="h-11xl w-11xl rounded-lg object-cover"
            />
          </td>

          <!-- Caption -->
          <td class="px-6xl py-xxl">
            <p class="label_2_semibold primary_text_color">
              {{ row.title }}
            </p>
          </td>

          <!-- Platforms -->
          <td class="px-6xl py-xxl">
            <div class="flex flex-wrap gap-xs">
              <span
                v-for="p in row.platforms"
                :key="p"
                class="rounded-lg bg-info-50 border border-black-25 px-md py-xxs body_4_medium secondary_text_color"
              >
                {{ p }}
              </span>
            </div>
          </td>

          <!-- Date -->
          <td class="px-6xl py-xxl label_2_medium secondary_text_color">
            <div>{{ row.date }}</div>
            <div>{{ row.time }}</div>
          </td>

          <!-- Reach -->
          <td class="px-6xl py-xxl label_2_medium secondary_text_color">
            {{ row.reach }}
          </td>

          <!-- Engagement -->
          <td class="px-6xl py-xxl label_2_medium secondary_text_color">
            {{ row.engagement }}
          </td>

          <!-- Status -->
          <td class="px-6xl py-xxl">
            <span
              class="rounded-lg px-md py-xxs body_4_medium"
              :class="statusClass(row.status)"
            >
              {{ row.status }}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-6xl py-xxl text-center">
            <div class="relative dropdown-container" :ref="el => setDropdownRef(el, index)">
              <button
                @click.stop="toggleDropdown(index)"
                class="flex h-8xl w-8xl items-center justify-center rounded-full hover:primary_border_color hover:bg-gray-25"
                :ref="el => setButtonRef(el, index)"
              >
                <img :src="ThreeDotsIcon" alt="ThreeDotsIcon">
              </button>
              
              <!-- Dropdown Menu -->
              <Teleport to="body">
                <div
                  v-if="openDropdownIndex === index"
                  :ref="el => setDropdownMenuRef(el, index)"
                  :style="getDropdownStyle(index)"
                  class="dropdown-menu fixed z-[9999] min-w-[160px] rounded-lg bg_secondary_color shadow-lg primary_border_color border"
                >
                <!-- Approve post (only for pending status) -->
                <div
                  v-if="row.status === 'Pending'"
                  @click.stop="handleApprovePost(row)"
                  class="flex items-center gap-3xl px-5xl py-3xl cursor-pointer bg_secondary_color hover:bg_primary_color first:rounded-t-lg"
                >
                  <img :src="ApprovePostIcon" alt="">
                  <span class="body_2_medium primary_text_color">Approve post</span>
                </div>
                
                <div
                  @click.stop="handleViewPost(row)"
                  class="flex items-center gap-3xl px-5xl py-3xl cursor-pointer hover:bg_primary_color"
                  :class="row.status !== 'Pending' ? 'first:rounded-t-lg' : ''"
                >
                  <img :src="ViewPostIcon" alt="">
                  <span class="body_2_medium primary_text_color">View post</span>
                </div>
                
                <div
                  @click.stop="handleRepost(row)"
                  class="flex items-center gap-3xl px-5xl py-3xl cursor-pointer hover:bg_primary_color"
                  :class="row.status !== 'Pending' ? 'last:rounded-b-lg' : ''"
                >
                  <img :src="RepostIcon" alt="">
                  <span class="body_2_medium primary_text_color">Repost</span>
                </div>
                
                <!-- Edit design (only for pending status) -->
                <div
                  v-if="row.status === 'Pending'"
                  @click.stop="handleEditDesign(row)"
                  class="flex items-center gap-3xl px-5xl py-3xl cursor-pointer hover:bg_primary_color"
                >
                  <img :src="ImageEditIconGray" alt="">
                  <span class="body_2_medium primary_text_color">Edit design</span>
                </div>
                
                <!-- Delete (only for pending status) -->
                <div
                  v-if="row.status === 'Pending'"
                  @click.stop="handleDeletePost(row)"
                  class="flex items-center gap-3xl px-5xl py-3xl cursor-pointer hover:bg_primary_color last:rounded-b-lg"
                >
                  <img :src="TrashIcon" alt="">
                  <span class="body_2_medium text-red-500">Delete</span>
                </div>
                </div>
              </Teleport>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- View Post Modal -->
  <ViewPostModal
    :open="showViewPostModal"
    :postData="selectedPost"
    :openRepostModal="showRepostModal"
    @close="closeViewPostModal"
    @repost="handleRepostFromModal"
    @closeRepostModal="showRepostModal = false"
  />

  <!-- Delete Post Modal -->
  <DeletePostModal
    :open="showDeleteModal"
    @close="closeDeleteModal"
    @confirm="confirmDeletePost"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import ViewPostModal from './ViewPostModal.vue';
import DeletePostModal from '../../Calendar/DeletePostModal.vue';
import ViewPostIcon from  "../../../assets/images/ViewPostIcon.svg"
import RepostIcon from "../../../assets/images/RepostIcon.svg"
import ThreeDotsIcon from "../../../assets/images/ThreeDotsIcon.svg"
import ApprovePostIcon from "../../../assets/images/ApprovePostIcon.svg"
import ImageEditIconGray from "../../../assets/images/ImageEditIconGray.svg"
import TrashIcon from "../../../assets/images/TrashIcon.svg"

const props = defineProps({
  rows: Array,
});

const openDropdownIndex = ref(null);
const showViewPostModal = ref(false);
const selectedPost = ref(null);
const selectedRows = ref([]);
const showDeleteModal = ref(false);
const postToDelete = ref(null);
const showRepostModal = ref(false);
const dropdownPositions = ref({});
const dropdownStyles = ref({});
const buttonRefs = ref({});
const dropdownRefs = ref({});
const dropdownMenuRefs = ref({});

const isAllSelected = computed(() => {
  return props.rows && props.rows.length > 0 && selectedRows.value.length === props.rows.length;
});

const isIndeterminate = computed(() => {
  return selectedRows.value.length > 0 && selectedRows.value.length < props.rows.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = props.rows.map((_, index) => index);
  }
};

const toggleRowSelection = (index) => {
  const idx = selectedRows.value.indexOf(index);
  if (idx > -1) {
    selectedRows.value.splice(idx, 1);
  } else {
    selectedRows.value.push(index);
  }
};

const statusClass = (status) => {
  if (status === 'Published')
    return 'border border-blue-100 bg-blue-25 text-blue-200';
  if (status === 'Pending')
    return 'border border-warning-200 bg-warning-50 text-warning-500';
  if (status === 'Approved')
    return ' border border-success-200 bg-success-50 text-success-800';
};

const setButtonRef = (el, index) => {
  if (el) {
    buttonRefs.value[index] = el;
  }
};

const setDropdownRef = (el, index) => {
  if (el) {
    dropdownRefs.value[index] = el;
  }
};

const setDropdownMenuRef = (el, index) => {
  if (el) {
    dropdownMenuRefs.value[index] = el;
    nextTick(() => {
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        calculateDropdownPosition(index);
      });
    });
  }
};

const calculateDropdownPosition = (index) => {
  const button = buttonRefs.value[index];
  const menu = dropdownMenuRefs.value[index];
  
  if (!button || !menu) return;
  
  const buttonRect = button.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const padding = 16; // 16px padding from viewport edges
  
  // Calculate available space below and above the button
  const spaceBelow = viewportHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;
  const menuHeight = menuRect.height || 200; // Estimate if not yet rendered
  const menuWidth = menuRect.width || 160;
  
  // Determine vertical position
  let top = 0;
  let position = 'bottom';
  
  if (spaceBelow >= menuHeight + padding) {
    // Show below button
    top = buttonRect.bottom + 4; // 4px gap
    position = 'bottom';
  } else if (spaceAbove >= menuHeight + padding) {
    // Show above button
    top = buttonRect.top - menuHeight - 4; // 4px gap
    position = 'top';
  } else {
    // Choose side with more space
    if (spaceAbove > spaceBelow) {
      top = Math.max(padding, buttonRect.top - menuHeight - 4);
      position = 'top';
    } else {
      top = Math.min(viewportHeight - menuHeight - padding, buttonRect.bottom + 4);
      position = 'bottom';
    }
  }
  
  // Calculate horizontal position (align to right of button)
  let right = viewportWidth - buttonRect.right;
  
  // Ensure dropdown doesn't go off screen
  if (right + menuWidth > viewportWidth - padding) {
    right = padding;
  }
  
  dropdownStyles.value[index] = {
    top: `${top}px`,
    right: `${right}px`,
    position: 'fixed'
  };
  
  dropdownPositions.value[index] = position;
};

const getDropdownStyle = (index) => {
  return dropdownStyles.value[index] || { top: '0px', right: '0px' };
};

const toggleDropdown = (index) => {
  if (openDropdownIndex.value === index) {
    openDropdownIndex.value = null;
    delete dropdownPositions.value[index];
    delete dropdownStyles.value[index];
  } else {
    openDropdownIndex.value = index;
    // Position will be calculated in nextTick after menu is rendered
  }
};

const handleViewPost = (row) => {
  selectedPost.value = row;
  showViewPostModal.value = true;
  const currentIndex = openDropdownIndex.value;
  openDropdownIndex.value = null;
  if (currentIndex !== null) {
    delete dropdownPositions.value[currentIndex];
    delete dropdownStyles.value[currentIndex];
  }
};

const closeViewPostModal = () => {
  showViewPostModal.value = false;
  selectedPost.value = null;
  showRepostModal.value = false;
};

const handleRepost = (row) => {
  console.log('Repost:', row);
  const currentIndex = openDropdownIndex.value;
  openDropdownIndex.value = null;
  if (currentIndex !== null) {
    delete dropdownPositions.value[currentIndex];
    delete dropdownStyles.value[currentIndex];
  }
  // Add your repost logic here
};

const handleRepostFromModal = (postData) => {
  console.log('Repost from modal:', postData);
  // Add your repost logic here
};

const handleApprovePost = (row) => {
  console.log('Approve post:', row);
  const currentIndex = openDropdownIndex.value;
  openDropdownIndex.value = null;
  if (currentIndex !== null) {
    delete dropdownPositions.value[currentIndex];
    delete dropdownStyles.value[currentIndex];
  }
  // Add your approve post logic here
};

const handleEditDesign = (row) => {
  console.log('Edit design:', row);
  const currentIndex = openDropdownIndex.value;
  openDropdownIndex.value = null;
  if (currentIndex !== null) {
    delete dropdownPositions.value[currentIndex];
    delete dropdownStyles.value[currentIndex];
  }
  // Set selected post and open repost modal
  selectedPost.value = row;
  showViewPostModal.value = true;
  showRepostModal.value = true;
};

const handleDeletePost = (row) => {
  postToDelete.value = row;
  showDeleteModal.value = true;
  const currentIndex = openDropdownIndex.value;
  openDropdownIndex.value = null;
  if (currentIndex !== null) {
    delete dropdownPositions.value[currentIndex];
    delete dropdownStyles.value[currentIndex];
  }
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  postToDelete.value = null;
};

const confirmDeletePost = () => {
  console.log('Delete post confirmed:', postToDelete.value);
  // Add your delete post logic here
  // You can emit an event or call an API to delete the post
  closeDeleteModal();
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown-container') && !event.target.closest('.dropdown-menu')) {
    const currentIndex = openDropdownIndex.value;
    openDropdownIndex.value = null;
    if (currentIndex !== null) {
      delete dropdownPositions.value[currentIndex];
      delete dropdownStyles.value[currentIndex];
    }
  }
};

const handleResize = () => {
  if (openDropdownIndex.value !== null) {
    calculateDropdownPosition(openDropdownIndex.value);
  }
};

const handleScroll = () => {
  if (openDropdownIndex.value !== null) {
    calculateDropdownPosition(openDropdownIndex.value);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll, true);
});
</script>

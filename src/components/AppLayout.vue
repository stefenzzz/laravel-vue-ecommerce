<script setup>
import { RouterView } from 'vue-router';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import { onMounted, onUnmounted, ref } from 'vue';



const sidebarOpened = ref(true);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
  }

function updateSidebarState() {
  sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
    
    window.addEventListener('resize', updateSidebarState)
  })

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})

</script>

<template>

    
  <div v-if="true" class="min-h-full bg-gray-200 flex">
    
    <Sidebar :class="{'-ml-[200px]': !sidebarOpened}"/>

    <div class="flex-1">
        <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
        <main class="p-6">
            <RouterView />
        </main>
    </div>

 </div>

 <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
    <!-- <Spinner /> -->
  </div>

  <!-- <Toast /> -->

</template>
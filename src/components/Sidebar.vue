<script setup>
  import {HomeIcon, UserGroupIcon, UsersIcon, Bars4Icon, ChartBarIcon} from '@heroicons/vue/24/outline';
  import { RouterLink } from 'vue-router';
</script>


<template>
    <div class="min-w-[200px] w-[200px]  transition-all bg-indigo-700 text-white py-4 px-2">

      <RouterLink :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <HomeIcon class="w-5"/>
        </span>
        <span class="text-base">
          Dashboard
        </span>
      </RouterLink>

      <RouterLink :to="{name: 'app.products'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <Bars4Icon class="w-5"/>
        </span>
        <span class="text-base">
          Products
        </span>
      </RouterLink>
      
      <RouterLink :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <Bars4Icon class="w-5"/>
        </span>
        <span class="text-base">
          Orders
        </span>
      </RouterLink>

      <RouterLink :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <UsersIcon class="w-5"/>
        </span>
        <span class="text-base">
          Users
        </span>
      </RouterLink>

      <RouterLink :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <UserGroupIcon class="w-5"/>
        </span>
        <span class="text-base">
          Customers
        </span>
      </RouterLink>

      <RouterLink :to="{name: 'app.dashboard'}"
                   class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
        <span class="mr-2 text-gray-300">
          <ChartBarIcon class="w-5"/>
        </span>
        <span class="text-base">
          Reports
        </span>
      </RouterLink>

    </div>
  </template>
  
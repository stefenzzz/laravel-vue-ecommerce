<script setup> 

import GuestLayout from '@/components/GuestLayout.vue';
import { RouterLink } from 'vue-router';
import { LockClosedIcon } from '@heroicons/vue/24/solid';
import { reactive, ref } from 'vue';
import useAuthStore from '@/stores/Auth';
import { storeToRefs } from 'pinia';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'


const { login } = useAuthStore();
const { errors, isLoading } = storeToRefs(useAuthStore());

const formData = reactive({
  email:'',
  password:''
});

const clearError = (field) =>{
  errors.value[field] = '';

}

</script>

<template>

  <GuestLayout title="Sign in to your account">
        
    <form @submit.prevent="login(formData)" class="space-y-6 relative">

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input @focus="clearError('email')" v-model="formData.email" type="text" autocomplete="email"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p v-if="errors.email" class="error">{{  errors.email[0] }}</p> 
          </div>
        </div>

        <div>

          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <RouterLink :to="{ name: 'requestPassword' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</RouterLink>
            </div>
          </div>
          <div class="mt-2">
            <input @focus="clearError('password')" v-model="formData.password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p v-if="errors.password" class="error">{{  errors.password[0] }}</p> 
          </div>

        </div>

        <div>
          <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
          Submit
         </button>
        </div>

        <div v-if="isLoading" class="absolute -top-6 left-0 w-full h-full grid place-content-center bg-[rgba(255,255,255,.6)]">
              <ClipLoader  strokeWidth={20} color="#888" />
        </div>

    </form>

  </GuestLayout>

</template>
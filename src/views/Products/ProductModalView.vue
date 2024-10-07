<script setup>

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue';
import Spinner from '@/components/core/Spinner.vue';
import { computed, onUpdated, reactive } from 'vue';
import CustomInput from '@/components/core/CustomInput.vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/Product';
import { XCircleIcon } from '@heroicons/vue/24/solid';

const { storeProduct, updateProduct } =  useProductStore() ;
const { errors } = storeToRefs(useProductStore());

const props = defineProps({
  modelValue: Boolean,
  product: {
    required: true,
    type: Object,
  }
})



const emits = defineEmits(['close']);

const submitForm = async () => {

  // update if there is product set from props using product id
  if(props.product.id){
    
    if( await updateProduct(props.product) ) emits('close') // close modal if success;

  // create if there is no product set from props
  }else{
    
    if( await storeProduct(props.product) ) emits('close') // close modal if success;
    
  }
}

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>

    <TransitionRoot as="template" :show="modelValue">
      
      <Dialog as="div" class="relative z-10" @close="show = false">
        

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="test fixed inset-0 bg-black bg-opacity-70 transition-opacity" ></div> 
        </TransitionChild>
  
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
                             enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                             enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                             leave-from="opacity-100 translate-y-0 sm:scale-100"
                             leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-[700px] sm:w-full">
                <Spinner v-if="product.isLoading"
                         class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center"/>

                <header class="py-3 px-4 flex justify-between items-center">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    {{ product.id ? `Update product: "${ product.title}"` : 'Create new Product' }}
                  </DialogTitle>

                  <button
                    @click="emits('close')"
                    class="flex items-center justify-center rounded-full transition-colors cursor-pointer "
                  >
                  <XCircleIcon class="text-gray-500 w-10 h-10"/>
                  </button>
                  
                </header>

                <form @submit.prevent="submitForm()">
                  <div class="bg-white px-4 pt-5 pb-4 space-y-6">   

                    <div>                      
                      <CustomInput v-model="product.title" label="Product Title"/>
                      <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
                    </div>

                    <div>                     
                      <CustomInput type="file" label="Product Image" @change="file => product.image = file"/>
                        <p v-if="errors.image" class="error">{{ errors.image[0] }}</p>
                    </div>

                    <div>                   
                      <CustomInput type="textarea" v-model="product.description" label="Description" rows="10" />
                      <p v-if="errors.description" class="error">{{ errors.description[0] }}</p>
                    </div>

                    <div>                     
                     <CustomInput type="number" v-model="product.price" label="Price" prepend="$"/>
                     <p v-if="errors.price" class="error">{{ errors.price[0] }}</p>
                    </div>

                    <div>                     
                     <CustomInput type="checkbox" v-model="product.published" label="Published"/>
                     <p v-if="errors.checkbox" class="error">{{ errors.checkbox[0] }}</p>
                    </div>

                  </div>

                  <footer class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="submit"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                            text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500">
                    {{ product.id ? 'Update': 'Create' }}
                    </button>
                    <button type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="emits('close')" ref="cancelButtonRef">
                      Cancel
                    </button>

                  </footer>
                </form>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

</template>
  
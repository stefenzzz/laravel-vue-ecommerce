<script setup>
import { useProductStore } from "@/stores/Product";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {EllipsisVerticalIcon, PencilIcon, TrashIcon} from '@heroicons/vue/24/outline'
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, watch } from "vue";
import TableHeaderCell from "@/components/core/TableHeaderCell.vue";
import { PRODUCTS_PER_PAGE } from "@/contants";
import Spinner from "@/components/core/Spinner.vue";

const {getProducts, deleteProduct} = useProductStore();
const {products} = storeToRefs( useProductStore() );

const emits = defineEmits(['edit']);

const formData = reactive({
    url: '',
    search: '',
    per_page: PRODUCTS_PER_PAGE,
    sort_field: 'updated_at',
    sort_direction: 'desc'
});


function sortProducts(field) {
  if(field === formData.sort_field){
    formData.sort_direction = formData.sort_direction === 'desc' ? 'asc' : 'desc';
  }
  else {
    formData.sort_field = field;
    formData.sort_direction= 'asc'
  }
}


// monitor changes in fomrData property values to re-execute getProducts
watch(formData, () =>  getProducts(formData) );


onMounted(()=> getProducts() );

</script>


<template>

  <div  class="bg-white p-4 rounded-lg shadow animate-fade-in-down">

    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Per Page</span>

        <select 
            v-model="formData.per_page"
            class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <span class="ml-3">Found {{products.total}} products</span>
      </div>
      <div>
        <input v-model="formData.search"
               class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Type to Search products">
      </div>
    </div>

    <table class="table-auto w-full min-h-[720px]">
      <thead>
      <tr>
        <TableHeaderCell custom_class="w-[5%]" field="id" :sortField="formData.sort_field" :sortDirection="formData.sort_direction" @click="sortProducts('id')">
          ID
        </TableHeaderCell>
        <TableHeaderCell  custom_class="w-[10%]" field="image" :custom-class="true" :sortField="formData.sort_field" :sortDirection="formData.sort_direction">
          Image
        </TableHeaderCell>
        <TableHeaderCell  custom_class="w-[30%]" field="title" :sortField="formData.sort_field" :sortDirection="formData.sort_direction"
                         @click="sortProducts('title')">
          Title
        </TableHeaderCell>
        <TableHeaderCell  custom_class="w-[10%]" field="price" :sortField="formData.sort_field" :sortDirection="formData.sort_direction"
                         @click="sortProducts('price')">
          Price
        </TableHeaderCell>
        <TableHeaderCell  custom_class="w-[20%]" field="updated_at" :sortField="formData.sort_field" :sortDirection="formData.sort_direction"
                         @click="sortProducts('updated_at')">
          Last Updated At
        </TableHeaderCell>
        <TableHeaderCell  custom_class="w-[5%]" field="actions">
          Actions
        </TableHeaderCell>
      </tr>
      </thead>


      <!--show spinner if loading -->
      <tr v-if="products.isLoading">
        <td  colspan="6">
          <Spinner />  
        </td>
      </tr>

      <tbody v-else-if="!products.isLoading &&  products.data">
        <tr v-for="(product, index) of products.data" class="animate-fade-in-down" :style="{ animationDelay: `${index * 50}ms` }">

          <td class="border-b py-2 px-6 ">{{ product.id }}</td>

          <td class="border-b py-2 px-6 ">
            <img class="w-16 h-16 object-contain" :src="product.image_url" :alt="product.title">
          </td>

          <td class="border-b py-2 px-6 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
            {{ product.title }}
          </td>

          <td class="border-b py-2 px-6">
            {{ $filters.currencyUSD(product.price) }}
          </td>

          <td class="border-b py-2 px-6 ">
            {{ product.updated_at }}
          </td>

          <td class="border-b py-2 text-center">
            <Menu as="div" class="w-full inline-block relative">
              
                <MenuButton
                  class="w-full h-10 inline-flex items-center justify-center rounded-full bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <EllipsisVerticalIcon
                    class="h-5 w-5 text-indigo-500"
                    aria-hidden="true"/>
                </MenuButton>
              

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute z-10 right-2/3 mt-2 w-32 -top-1/3  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="emits('edit',product.id)"
                      >
                        <PencilIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-indigo-400"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="deleteProduct(product.id)"
                      >
                        <TrashIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-indigo-400"
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </td>

        </tr>

        <!-- if there is no products.data upon search -->
      <td v-if="products.data.length <= 0" colspan="6" class="text-center py-8 text-gray-700">   
              There are no products
      </td>

      </tbody>

      <!-- if there is no products -->
      <td v-if="!products.isLoading && !products.data" colspan="6" class="text-center py-8 text-gray-700">   
              There are no products
      </td>


    </table>

    <!-- pagination footer  -->
    <div class="flex justify-between items-center mt-5">

      <div >
        Showing from {{ products.from }} to {{ products.to }}
      </div>

      <!-- pagination buttons container -->
      <nav
        v-if="products.total > products.limit"
        class=" inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
      
      <!-- pagination buttons  -->
        <a
          v-for="(link, i) of products.links"
          :key="i"
          @click.prevent="link.url && (formData.url = link.url)"
          aria-current="page"
          :class="`cursor-pointer inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap
              ${ link.active  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
              ${ i === 0 && 'rounded-l-md' }
              ${ i === products.links.length - 1 && 'rounded-r-md' }
              ${ !link.url && ' bg-gray-100 text-gray-700' } `"
          v-html="link.label"       
        >
        </a>
      </nav>

    </div>
    
  </div>



</template>

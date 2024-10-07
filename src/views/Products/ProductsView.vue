<script setup>
import { useProductStore } from '@/stores/Product';
import ProductModalView from './ProductModalView.vue';
import ProductsTableView from './ProductsTableView.vue';
import { computed, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const showModal = ref(false);
const { getProduct } = useProductStore();
const { product, errors } = storeToRefs(useProductStore());

const trackModal = computed(()=>{
    // if showModal is not open, set product to default 
    if(!showModal.value) product.value = {  id: '',title: '',description: '',image: '',price: '',published: false};
    return showModal.value;
});

const edit = async (productId)=>{
  showModal.value = true;
  await getProduct(productId);
}

const closeModal = ()=>{
  showModal.value = false;
  errors.value = {};
}

</script>

<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Products</h1>
      <button type="button"
              @click="showModal = true"
              class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add new Product
      </button>
    </div>
    <ProductsTableView @edit="edit"/>
    <ProductModalView v-model="trackModal" :product="product" @close="closeModal()"/>
</template>
  
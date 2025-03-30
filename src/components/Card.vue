<template>
    <div 
        class="bg-yellow-300/30"> <!-- card div-->
        <div class="bg-lime-400/60 text-xl pl-2 py-2 mb-8">{{ veg.name }}</div> <!-- header -->
        <div>
            <div class="w-full h-[150px] flex justify-center">
                <i class="fa-solid fa-carrot text-9xl text-pink-950"></i>
            </div> <!--card icon -->
            <div class="grid grid-cols-2 gap-y-2 mb-4 pl-2 text-pink-950">
                <div class="font-bold">Type:</div>
                <div>{{ veg.type }}</div>
                <div class="font-bold">Price:</div>
                <div>$ {{ veg.price.USD }}</div>
                <div class="font-bold">Quantity:</div>
                <div>
                    <input type="number" min="0" step="1" v-model="quantity" class="bg-white px-2 w-7/10">
                </div>
            </div>
        </div>
        <div class="bg-pink-950 text-xl pr-2 py-2 flex justify-end">
            <button 
                class="bg-[#f7eadb] w-2/5 h-8 text-base cursor-pointer font-bold text-lime-700 rounded-xs hover:text-pink-950 hover:outline-3 hover:outline-blue-800"
                @click="addToCart"
            >
            Add to cart
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { myCartManager, Order } from '../js/state.js'

  const props = defineProps({
    veg: {
        type: Object,
        required: true,
    },
  });

  let quantity = ref(0);

  function addToCart() {
    if (quantity.value == 0) return;
    const thisOrder = new Order(props.veg.id, props.veg.name, props.veg.price.USD, quantity.value);
    myCartManager.addOrder(thisOrder);
    //console.log(myCartManager);
    quantity.value = 0;
  }

</script>
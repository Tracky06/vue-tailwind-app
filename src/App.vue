<template>
  <div class="min-h-screen relative">
    <header class="bg-green-400 z-1 h-[80px] w-full flex justify-between items-center fixed py-8 px-[6.25%]">
      <div class="w-full h-full text-5xl flex  items-center">
        <i class="fa-solid fa-bowl-food"></i>
      </div>
      <div @click="toggleSidebar" class="font-bold text-3xl flex gap-4 items-center cursor-pointer">
        <span><i class="fa-solid fa-cart-shopping"></i></span> 
        <span> Cart({{ cart.noOfOrders }})</span>
      </div>
    </header>
    <main>
      <section class="h-screen w-full flex justify-center items-center bg-hero bg-cover bg-center mb-8">
        <div class="text-5xl lg:text-7xl xl:text-9xl font-black text-white drop-shadow-lg bg-black/60 px-4 py-4 rounded-2xl">Splendid Food</div>
      </section>
      <section class="px-[6.25%]">
        <h1 class="mb-8 text-3xl lg:text-5xl font-semibold text-center">Products</h1>
        <div class="w-full flex justify-center">
          <div class="w-full grid-parent mb-[50px]">
           <ProductCard v-for="item in vegData" :key="item.id" :veg="item"/>
          </div>
        </div>
      </section>      
    </main>
    <aside v-if="visible" class="w-4/5 min-h-screen z-2 lg:w-2/5 fixed inset-y-0 right-0 bg-neutral-900">
      <article class="w-full h-[80px] bg-slate-500 flex justify-between items-center px-8 text-3xl font-extrabold text-gray-100 border-b-gray-300 border-b-2 mb-4">
        <div>
          <span>Cart</span>
          <span><i class="fa-solid fa-cart-shopping ml-2"></i></span>
        </div>
        <div @click="toggleSidebar" class="cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
      </article>
      <article>
        <div class="px-4">
          <table v-if="cart.noOfOrders != 0" class="text-white w-full mb-8">
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-left">Price</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Total</th>
              </tr>              
            </thead>
            <tbody>
              <tr v-for="item in cart.myOrders" :key="item.id">
                <td>{{ item.product }}</td>
                <td>$ {{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>$ {{ item.total }}</td>
                <td>
                  <div 
                      class="bg-gray-200 w-[30px] m-1 flex items-center justify-center p-1 text-lime-700 rounded-sm cursor-pointer"
                      @click="myCartManager.removeOrder(item.id)"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-white mt-4 text-center">No items in cart</p>
          <hr v-if="cart.noOfOrders != 0" class="text-white mb-1">
          <p v-if="cart.noOfOrders != 0" class="text-white"><span class="font-bold">Total: </span> $ {{ cart.totalPrice }}</p>
        </div>
      </article>
    </aside>
    <footer></footer>
  </div>
</template>

<script setup>
  import { ref, onBeforeMount }  from "vue";
  import ProductCard from './components/Card.vue';
  import { myCartManager } from './js/state.js'

  let vegData = ref([]);
  let visible = ref(false);
  const cart = myCartManager.state;

  function toggleSidebar() {
    visible.value = !visible.value;
  }

  onBeforeMount(async() => {
    try {
    const result = await fetch("/vue-tailwind-app/food.json");
    const data = await result.json();
    vegData.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }  
  })

</script>
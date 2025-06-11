<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import PizzaTable from '@/components/Tables/PizzaTable.vue';
import PizzaType from '@/components/Tables/PizzaType.vue';
import OrderTable from '@/components/Tables/OrderTable.vue';
import IngredientTable from '@/components/Tables/IngredientTable.vue';
import NumberCard from '@/components/NumberCard.vue';
import { PresentationChartLineIcon } from '@heroicons/vue/20/solid';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore()

const { fetchDashboardCardStats } = store
const type = ref('');

onBeforeMount(() => {
  fetchDashboardCardStats()
})

const cardStats = computed(() => store.cards)

</script>

<template>
  <main class="pt-16">
    <div class="w-full grid grid-cols-3 gap-4 rounded-md">
      <NumberCard :cardText="'Total Orders'" :numberValue="cardStats.total_orders">
        <template #icon>
          <PresentationChartLineIcon class="size-5" />
        </template>
      </NumberCard>
      <NumberCard :cardText="'Best Selling Pizza'" :textValue="cardStats.most_ordered.name">
        <template #icon>
          <PresentationChartLineIcon class="size-5" />
        </template>
      </NumberCard>
      <NumberCard :cardText="'Total Pizzas Sold'" :numberValue="cardStats.total_pizzas_ordered" >
        <template #icon>
          <PresentationChartLineIcon class="size-5" />
        </template>
      </NumberCard>
    </div>
    <div class="mt-4">
      <div>
        <label for="type" class="block text-xs text-gray-500">Select Data Type</label>
        <select v-model="type" name="type" id="type" class="border-gray-300 text-sm border rounded-sm p-2 w-full">
          <option value="--">--</option>
          <option value="pizza">Pizza</option>
          <option value="pizza_type">Pizza Type</option>
          <option value="order">Order</option>
          <option value="ingredient">Ingredients</option>
        </select>
      </div>
    </div>
    <div>
      <PizzaTable v-if="type == 'pizza'" />
      <PizzaType v-if="type == 'pizza_type'" />
      <OrderTable v-if="type == 'order'" />
      <IngredientTable v-if="type == 'ingredient'" />
    </div>
  </main>
</template>

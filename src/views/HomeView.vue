<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import PizzaTable from '@/components/Tables/PizzaTable.vue';
import PizzaType from '@/components/Tables/PizzaType.vue';
import OrderTable from '@/components/Tables/OrderTable.vue';
import IngredientTable from '@/components/Tables/IngredientTable.vue';
import NumberCard from '@/components/NumberCard.vue';
import { PresentationChartLineIcon } from '@heroicons/vue/20/solid';
import { useDashboardStore } from '@/stores/dashboard';
import CircSpinner from '@/components/CircSpinner.vue';

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
      <NumberCard :cardText="'Best Selling Pizza'" :textValue="cardStats.most_ordered?.name">
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
    <div class="grid grid-cols-2 gap-4 rounded-xl mt-4">
      <div>
        <div class="font-bold">
          Top Five Best Selling Pizza
        </div>
        <table v-if="cardStats.top_five_most_ordered?.length > 0" class="table-auto w-full items-center border border-gray-100 border-collapse shadow-md drop-shadow-md">
          <thead>
            <tr>
              <th class="px-2 py-1 font-bold text-sm border-gray-300">Pizza</th>
              <th class="px-2 py-1 font-bold text-sm border-gray-300">No. of Orders</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mo, moIndex) in cardStats.top_five_most_ordered" :key="moIndex" class="bg-white border-n text-sm">
              <td class="px-2 py-2 text-sm font-medium text-gray-900">{{ mo.name }}</td>
              <td class="px-2 py-2 text-sm text-gray-500">{{ mo.total_orders }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="flex justify-center">
          <CircSpinner :is-loading="true" />
        </div>
      </div>
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

<script setup>
import Datatables from '../Datatables.vue';
import { computed, onMounted } from 'vue';
import { usePizzaTableStore } from '@/stores/pizzas';

const store = usePizzaTableStore();

const {handleOptionsUpdate, handlePagination, handleSortingUpdate, fetchPizzaData, fetchfilterValues} = store

onMounted(() => {
    fetchPizzaData(1)
    fetchfilterValues()
})

const isLoading = computed(() => store.isLoading)
const isInitialLoading = computed(() => store.isInitialLoading)
const filterInfo = computed(() => store.filterInfo[0])
const headers = computed(() => store.headers[0])
const options = computed(() => store.options)

function temporaryExportingFunction() {
    //
}

</script>

<template>
    <div v-if="!isInitialLoading">
        <Datatables ref="pizzaTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'PIZZA_'" :tableIndex="0" :tableFilters="filterInfo" :tableFilterData="store.getFilterData" :tableHeaders="headers" :tableData="store.getPizzaData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
            
            <template v-slot:emptyResultText>
                <span class="italic">-- No Pizzas --</span>
            </template>
        </Datatables>
    </div>
</template>
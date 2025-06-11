<script setup>
import Datatables from '../Datatables.vue';
import { computed, onMounted } from 'vue';
import { usePizzaTypeTableStore } from '@/stores/pizza_types'

const store = usePizzaTypeTableStore();

const {handleOptionsUpdate, handlePagination, handleSortingUpdate, fetchPizzaTypeData, fetchfilterValues} = store

onMounted(() => {
    fetchPizzaTypeData(1)
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
        <Datatables ref="pizzaTypeTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'PIZZA_TYPE_'" :tableIndex="0" :tableFilters="filterInfo" :tableFilterData="store.getFilterData" :tableHeaders="headers" :tableData="store.getPizzaTypeData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
            <template v-slot:emptyResultText>
                <span class="italic">-- No Pizza Types --</span>
            </template>
        </Datatables>
    </div>
</template>
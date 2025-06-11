<script setup>
import Datatables from '../Datatables.vue';
import { computed, onMounted } from 'vue';
import { useOrderTableStore } from '@/stores/orders';
import { useDate } from '@/composables/useDate';

const store = useOrderTableStore();
const date = useDate();

const {handleOptionsUpdate, handlePagination, handleSortingUpdate, fetchOrderData} = store

onMounted(() => {
    fetchOrderData(1)
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
        <Datatables ref="orderTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'ORDER_'" :tableIndex="0" :tableFilters="filterInfo" :tableFilterData="store.getFilterData" :tableHeaders="headers" :tableData="store.getOrderData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
            <template #date_placed="index">
                {{ date(index.index.created_at).format('MMMM DD, YYYY hh:mm A') }}
            </template>
            <template v-slot:emptyResultText>
                <span class="italic">-- No Orders --</span>
            </template>
        </Datatables>
    </div>
</template>
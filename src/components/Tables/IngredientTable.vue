<script setup>
import Datatables from '../Datatables.vue';
import { computed, onMounted } from 'vue';
import { useIngredientTableStore } from '@/stores/ingredients';

const store = useIngredientTableStore();

const {handleOptionsUpdate, handlePagination, handleSortingUpdate, fetchIngredientData} = store

onMounted(() => {
    fetchIngredientData(1)
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
        <Datatables ref="ingredientTable" :isLoading="isLoading" :isInitialLoad="isInitialLoading" :isExportEnabled="true" :filePrefix="'INGREDIENT_'" :tableIndex="0" :tableFilters="filterInfo" :tableFilterData="store.getFilterData" :tableHeaders="headers" :tableData="store.getIngredientData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination" @onUpdateSorting="handleSortingUpdate" @onClickExport="temporaryExportingFunction">
            
            <template v-slot:emptyResultText>
                <span class="italic">-- No Ingredients --</span>
            </template>
        </Datatables>
    </div>
</template>
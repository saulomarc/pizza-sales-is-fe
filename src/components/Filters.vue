<template>
    <div class="my-2">
        <div v-if="!isLoading">
            <div v-if="filter_headers.length > 0" class="mb-4  items-end" :class="isModal ? '': 'flex'">
                <div v-for="(filter, filterKey) in filter_headers" :key="filterKey" class="">
                    <div v-if="filter.type == 'select'">
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <select :name=filterKey :id="filter.name + '_' + filterKey"
                            :class="isModal ? 'p-2 leading-8 border border-gray-300 w-full  mb-3 rounded-sm' : 'p-2 leading-8 w-28'"
                            @change="changeInput($event.target.value, filter.field)">
                            <option value="--" class="text-center" selected>--</option>
                            <option v-for="(fValue, fKey) in filters[filter.field]" :key="fKey" :value="fValue[filter.name]">{{ fValue[filter.name] }}</option>
                        </select>
                    </div>
                    <!-- <div v-else-if="filter.type == 'combobox'" :class="isModal ? 'w-full mb-3 ' : 'w-52'">
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <v-select class="w-full style-chooser" :dropdown-should-open="dropdownShouldOpen" :label="filter.name"
                            :options="filters[filter.field]" @input="(value) => chooseCombobox(filter.field, value)"
                            :multiple="filter.multiple"
                        ></v-select>
                    </div> -->
                    <div v-else-if="filter.type == 'input'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="text" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput($event.target.value, filter.field)">
                    </div>
                    <div v-else-if="filter.type == 'date'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="date" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput($event.target.value, filter.field)">
                    </div>
                    <div v-else-if="filter.type == 'datetime-local'" :class="isModal ? 'w-full' : 'w-52'" >
                        <label :for=filterKey class="block text-xs text-gray-500">{{ filter.label }}</label>
                        <input type="datetime-local" class="bg-white p-2"
                        :class="isModal ? 'border border-gray-300 w-full mb-3 rounded-sm' : ''" 
                        @change="changeInput($event.target.value, filter.field)">
                    </div>
                </div>
                <div>
                    <button @click="applyFilter" class="p-2 bg-blue-500 text-white rounded w-full flex justify-center items-center"><FunnelIcon class="size-5 text-white mr-2" /> Apply Filter</button>
                </div>
            </div>
        </div>
        <Loader v-else :loaderType="'filters'" :columnNum="3" />
    </div>
</template>

<script setup>
// import 'vue-select/dist/vue-select.css';
import { computed } from "vue";
import { FunnelIcon } from '@heroicons/vue/20/solid';
import Loader from "./Loader.vue";

import { useFilterStore } from '@/stores/filters'

const store = useFilterStore()
const { initializeFilterValues, updateFilterValues, createFilters } = store

const props =  defineProps({
    filter_headers: {
        type: Array,
    },
    filters: {
        type: Object,
    },
    isLoading: {
        type: Boolean
    },
    index: {
        type: Number
    },
    isModal: {
        type: Boolean,
        default: false
    },
})


const filterValues = computed(() => store.filterValues)

fetchInitialData()

const emit = defineEmits([
    'applyFilter',
])

function fetchInitialData() {
    initializeFilterValues(props.index)
    props.filter_headers.forEach(header => {
        createFilters({
            index: props.index,
            key: header.field
        })
    });
}

function changeInput(e, key) {
    updateFilterValues({
        index: props.index,
        key: key,
        value: e
    })
}

function chooseCombobox(key, value) {
    if (value) {
        if (value[key]){
            updateFilterValues({
                filterIndex: this.index,
                key: key,
                value: value[key]
            })
        } else {
            updateFilterValues({
                filterIndex: this.index,
                key: key,
                value: value.map(a => a[key])
            })
        }
    } else {
        updateFilterValues({
            filterIndex: this.index,
            key: key,
            value: '--'
        })
    }
}

function applyFilter() {
    emit('applyFilter', filterValues.value[props.index])
}

function dropdownShouldOpen(VueSelect) {
    return VueSelect.search.length > 2 && VueSelect.open
}

</script>
  
<style>
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu,
    .vs--searchable,
    .vs__search {
        line-height: 1.75rem !important;
    }
</style>
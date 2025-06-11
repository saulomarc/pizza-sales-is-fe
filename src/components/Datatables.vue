<template>
    <div class="my-4">
        <slot name="tableHeader">
            <div class="flex items-center">
                <div class="w-full flex justify-between items-center mb-2">
                    <div v-if="tableFilters.length > 0" class="flex items-center">
                        <div v-if="tableFilters.length > 0">
                            <button @click="toggleModal()" class=" p-2 bg-blue-500 text-white rounded">
                                Open Filter
                            </button>
                        </div>
                        <Filters v-else :isLoading="isInitialLoad" :filter_headers="tableFilters" :filters="tableFilterData"
                            :index="tableIndex" @applyFilter="filterAction" />
                    </div>
                    <div>
                        <label for="num-of-items" class="block text-xs text-gray-500">No. of items</label>
                        <select v-model="numOfItems" name="num-of-items" id="num-of-items" class="p-1 w-full border-2 border-gray-200">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
        </slot>
        <div v-if="!isInitialLoad && isLoading"
            class="flex justify-center items-center w-full italic animate-pulse">
            {{ loadingText }}
            <CircSpinner :isLoading="isLoading" :size="'large'" />
        </div>
        <div v-if="!isLoading" :class="[
                'bg-white overflow-auto sm:rounded-lg mb-4',
                cssClass,
            ]">
            <table class="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-xl">
                <thead>
                    <tr class="font-bold bg-up-maroon font-optimasemi">
                        <th v-for="(header, headerIndex) in props.tableHeaders" :key="headerIndex" class="py-2 pl-4 pr-3 text-left text-sm font-semibold uppercase text-black sm:pl-3" scope="col"
                            @click="sort(header)">
                            <div v-if="header.checkbox">
                                <input type="checkbox" v-model="selectAll" @change="selectAllRows" />
                            </div>
                            <div class="flex items-center" :class="[header.label == 'Action' ? 'justify-center' : 'justify-start']" v-else>
                                {{ header.label }}
                                <div v-if="header.sortable" class="flex content-start justify-center">
                                    <svg v-if="header.name === order.order_field" aria-hidden="true" focusable="false" data-prefix="fas" class="my-2 w-3 h-3 transform ml-2"
                                        :class="[
                                            isSort(header.name),
                                            header.name === order.order_field ? '' : 'invisible',
                                        ]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                                        </path>
                                    </svg>
                                    <svg v-if="header.name !== order.order_field" fill="#ccc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ccc"
                                        class="my-2 w-3 h-3 ml-2" :class="[
                                            isSort(header.name),
                                            header.name === order.order_field ? 'invisible' : '',
                                        ]">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                            d="M7.293,8.707a1,1,0,0,1,0-1.414l4-4a1,1,0,0,1,1.414,0l4,4a1,1,0,1,1-1.414,1.414L12,5.414,8.707,8.707A1,1,0,0,1,7.293,8.707Zm0,8,4,4a1,1,0,0,0,1.414,0l4-4a1,1,0,0,0-1.414-1.414L12,18.586,8.707,15.293a1,1,0,1,0-1.414,1.414Z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex"
                        :class="{ 'bg-green-100': shouldHighlight(rowIndex) }"
                        class="transition-all transition-300 even:bg-gray-50"
                        >
                        <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" class="text-sm text-gray-900">
                            <div v-if="row[header.name]" class="px-3 py-5">
                                {{ row[header.name] }}
                            </div>
                            <div v-else-if="header.checkbox" class="px-3 py-4">
                                <input type="checkbox" v-model="selectedItems" :value="row[header.selectField]" />
                            </div>
                            <div v-else>
                                <slot :name="header.name" :index="row" :rowIndex="rowIndex">
                                </slot>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center py-4" v-if="tableData.length === 0">
                <slot name="emptyResultText">No Data Available</slot>
            </div>
            <vs-pagination v-if="tableData.last_page && tableData.current_page" :total-pages="tableData.last_page"
            :current-page="tableData.current_page" @change="changePage"></vs-pagination>
        </div>
        <Loader v-if="isInitialLoad && isLoading" :loaderType="'table'" :columnNum="4" />
        <FilterModal v-show="showModal" :isOpen='true' @onCloseModal="toggleModal">
            <template v-slot:title>
                <div class="flex items-center">
                    <FunnelIcon class="text-black size-5 mr-2" />
                    Filter
                </div>
            </template>

            <template v-slot:content>
                <Filters :isLoading="isInitialLoad" :filter_headers="tableFilters" :filters="tableFilterData"
                    @applyFilter="filterAction" :isModal="showModal" :index='tableIndex' />
            </template>
      </FilterModal>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import VsPagination from '@vuesimple/vs-pagination';
import { FunnelIcon } from '@heroicons/vue/20/solid';
import Filters from './Filters.vue';
import CircSpinner from './CircSpinner.vue';
import FilterModal from './FilterModal.vue';
import Loader from './Loader.vue';

const props =  defineProps({
    isLoading: {
        type: Boolean,
    },
    isInitialLoad: {
        type: Boolean,
    },
    tableFilters: {
        type: Array,
        default() {
            return [];
        },
    },
    tableIndex: {
        type: Number,
        default: 0,
    },
    tableFilterData: {
        type: Object,
    },
    tableHeaders: {
        type: Array,
    },
    tableData: {
        type: Array,
    },
    loadingText: {
        type: String,
        default: null,
    },
    isExportEnabled: {
        type: Boolean,
        default: false,
    },
    cssClass: {
        type: String,
    },
    filePrefix: {
        type: String,
        default: "",
    },
    highlighedtItems:{
        type: Array,
        default() {
            return [];
        },
    }
})

const emit = defineEmits([
    'onUpdateSorting',
    'onUpdateOptions',
    'onUpdatePage',
    'onSelect',
    'onClickExport'
])

const showModal = ref(false)
const selectAll = ref(false)
const selectedItems = ref([])
const page = ref(1)
const options = ref({
    numOfItems: 5,
    filters: {}
})
const order = ref({
    order_type: "",
    order_field: ""
})
const watcherValue = ref(0)
const CsvExport = ref(null)

const numOfItems = computed({
    get() {
        return options.value.numOfItems;
    },
    set(value) {
        options.value.numOfItems = value
        watcherValue.value++
    }
});

function filterAction(data) {
    options.value.filters = data
    watcherValue.value++
    showModal.value = false
}

function changePage(pageValue) {
    emit('onUpdatePage', {pageValue: pageValue, index: props.tableIndex})
}

function sort(header) {
    if (header.sortable) {
        if (
            order.value.order_field === header.name &&
            order.value.order_type === "ASC"
        ) {
            order.value.order_type = "DESC";
        } else {
            order.value.order_type = "ASC";
        }
        order.value.order_field = header.name;
        emit('onUpdateSorting', {...order.value, index: props.tableIndex});
    }
}

function isSort(fieldName) {
    if (
        fieldName === order.value.order_field &&
        order.value.order_type === "ASC"
    ) {
        return "-rotate-180";
    } else if (
        fieldName === order.value.order_field &&
        order.value.order_type === "DESC"
    ) {
        return "-rotate-0";
    } else {
        return "";
    }
}

function clickExportCSV() {
    emit('onClickExport')
}

function triggerExport(data) {
    CsvExport.value.exportToCsv(data)
}

function toggleModal() {
    showModal.value = !showModal.value
}

function selectAllRows() {
    if (selectAll.value) {
        const field = props.tableHeaders.find(
            (item) => item.checkbox
        ).selectField;
        if (field) {
            selectedItems.value = props.tableData.map((item) => item[field]);
        } else {
            selectedItems.value = props.tableData;
        }
    } else {
        selectedItems.value = [];
    }
}

function resetSelect() {
    selectAll.value = false;
    selectedItems.value = [];
}

function shouldHighlight(index) {
    return props.highlighedtItems.includes(index)
}

watch(watcherValue, (newVal, oldVal) => {
    emit("onUpdateOptions", {...options.value, index: props.tableIndex});
})

watch(selectedItems, (newVal, oldVal) => {
    if (selectedItems.value.length === props.tableData.length) {
        selectAll.value = true;
    } else {
        selectAll.value = false;
    }
    emit("onSelect", selectedItems.value);
})
</script>

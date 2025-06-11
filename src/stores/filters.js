import {defineStore} from 'pinia';

export const useFilterStore = defineStore('filters', {
    state: () => {
        return {
            filterValues: {}
        }
    },
    actions: {
        createFilters (data) {
            this.filterValues[data.index][data.key] = '--'
        },
        updateFilterValues (data) {
            this.filterValues[data.index][data.key] = data.value
        },
        initializeFilterValues (index) {
            this.filterValues[index] = {}
        }
    }
})
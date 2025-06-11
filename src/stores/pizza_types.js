import { defineStore } from 'pinia';
import { useAlertStore } from './alert';
import instance from '@/plugins/axios-plugin';

//Option Store
export const usePizzaTypeTableStore = defineStore('pizzaTypeTable', {
    state: () => {
        return {
            pizzaTypes: null,
            isInitialLoading: true,
            isLoading: false,
            filterInfo: [ 
                [
                    { field: 'code_like', name: 'code_like', type: 'input', label: 'Code' },
                    { field: 'name_like', name: 'name_like', type: 'input', label: 'Name' },
                    { field: 'category', name: 'category', type: 'select', label: 'Category' },
                ]
            ],
            headers: [
                [
                    {
                        name: "code",
                        sortable: true,
                        label: "Code"
                    },
                    {
                        name: "name",
                        sortable: false,
                        label: "Name"
                    },
                    {
                        name: "category",
                        sortable: false,
                        label: "Category"
                    },
                ]
            ],
            options: [
                {
                    page: 1,
                    filters: {},
                    numOfItems: 5
                },
            ],
            filters: [{}],
            filterValues: [{}],
            order: [{
                order_field: 'created_at',
                order_type: 'DESC'
            }],
        }
    },
    actions: {
        async fetchPizzaTypeData(page) {
            this.isLoading = true
            try {
                const { data } = await instance.get(`pizza-types`, {
                    params: {
                        page: page,
                        items: this.options[0].numOfItems,
                        ...this.order[0],
                        ...this.filterValues[0]
                    }
                })

                if (data) {
                    this.pizzaTypes = data.pizza_types
                }
            } catch (tryError) {
                console.log(tryError)
            }
            this.isLoading = false
            this.isInitialLoading = false
        },
        async fetchFilters(payload) {
            this.isLoading = true

            try {
                const { data, error, pending } = await instance.get("pizza-types", { params: payload })

                if (data) {
                    this.filters[payload.index][payload.column_name] = data.pizza_types
                    console.log(this.filters)
                } else if (error) {

                }

            } catch (error) {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`;
                useAlertStore().error(errMessage)
            }
            this.isLoading = false
        },
        fetchfilterValues() {
            this.filterInfo.forEach((fInfo, fInfoIndex) => { // create the filter values that will be used for this generic table instance
                fInfo.forEach(filter => { // create the filter values that will be used for this generic table instance
                    if (filter.type !== 'input' && filter.type !== 'date') {
                        this.fetchFilters({
                            column_name: filter.field,
                            distinct: 'true',
                            index: fInfoIndex
                        })
                    }
                });
            });
        },
        handleOptionsUpdate(options) {
            this.options[options.index].numOfItems = options.numOfItems
            this.filterValues[options.index] = options.filters
            this.fetchPizzaTypeData(1)
        },
        handleSortingUpdate(order) {
            this.order[order.index].order_type = order.order_type
            this.order[order.index].order_field = order.order_field
            this.fetchPizzaTypeData(1)
        },
        handlePagination(page) {
            this.fetchPizzaTypeData(page.pageValue)
        },
    },
    getters: {
        getPizzaTypeData() {
            if (this.pizzaTypes.data) {
                var tableData = this.pizzaTypes.data.map((gl) => {
                    return gl
                })

                var paginationData = {
                    last_page: this.pizzaTypes.last_page,
                    current_page: this.pizzaTypes.current_page,
                }

                tableData = Object.assign(tableData, paginationData)

                return tableData
            }

            return []
        },
        getFilterData() {
            return this.filters[0]
        }
    }
})
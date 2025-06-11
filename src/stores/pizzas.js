import { defineStore } from 'pinia';
import { useAlertStore } from './alert';
import instance from '@/plugins/axios-plugin';

//Option Store
export const usePizzaTableStore = defineStore('pizzaTable', {
    state: () => {
        return {
            pizzas: null,
            isInitialLoading: true,
            isLoading: true,
            filterInfo: [ 
                [
                    { field: 'pizza_name_like', name: 'pizza_name_like', type: 'input', label: 'Pizza Name' },
                    { field: 'pizza_type_name_like', name: 'pizza_type_name_like', type: 'input', label: 'Pizza Type Name' },
                    { field: 'size', name: 'size', type: 'select', label: 'Size' },
                ]
            ],
            headers: [
                [
                    {
                        name: "name",
                        sortable: true,
                        label: "Name"
                    },
                    {
                        name: "pizza_type_name",
                        sortable: false,
                        label: "Pizza Type Name"
                    },
                    {
                        name: "size",
                        sortable: false,
                        label: "Size"
                    },
                    {
                        name: "price",
                        sortable: true,
                        label: "Price"
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
        async fetchPizzaData(page) {
            this.isLoading = true
            try {
                const { data } = await instance.get(`pizzas`, {
                    params: {
                        page: page,
                        items: this.options[0].numOfItems,
                        ...this.order[0],
                        ...this.filterValues[0]
                    }
                })

                if (data) {
                    this.pizzas = data.pizzas
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
                const { data, error, pending } = await instance.get("pizzas", { params: payload })

                if (data) {
                    this.filters[payload.index][payload.column_name] = data.pizzas
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
            this.fetchPizzaData(1)
        },
        handleSortingUpdate(order) {
            this.order[order.index].order_type = order.order_type
            this.order[order.index].order_field = order.order_field
            this.fetchPizzaData(1)
        },
        handlePagination(page) {
            this.fetchPizzaData(page.pageValue)
        },
    },
    getters: {
        getPizzaData() {
            if (this.pizzas?.data) {
                var tableData = this.pizzas.data.map((pizza) => {
                    pizza.pizza_type_name = pizza.pizza_type.name

                    return pizza
                })

                var paginationData = {
                    last_page: this.pizzas.last_page,
                    current_page: this.pizzas.current_page,
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
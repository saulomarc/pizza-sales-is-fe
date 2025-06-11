import { defineStore } from 'pinia';
import { useAlertStore } from './alert';
import instance from '@/plugins/axios-plugin';

//Option Store
export const useOrderTableStore = defineStore('orderTable', {
    state: () => {
        return {
            orders: null,
            isInitialLoading: true,
            isLoading: false,
            filterInfo: [ 
                [
                    // { field: 'pizza_type_id', name: 'name', type: 'input', label: 'Pizza Type' },
                    // { field: 'size', name: 'size', type: 'select', label: 'Size' },
                ]
            ],
            headers: [
                [
                    {
                        name: "id",
                        sortable: true,
                        label: "ID"
                    },
                    {
                        name: "total_price",
                        sortable: false,
                        label: "Total Price"
                    },
                    {
                        name: "date_placed",
                        sortable: false,
                        label: "Ordered At"
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
        async fetchOrderData(page) {
            this.isLoading = true
            try {
                const { data } = await instance.get(`orders`, {
                    params: {
                        page: page,
                        items: this.options[0].numOfItems,
                        ...this.order[0],
                        ...this.filterValues[0]
                    }
                })

                if (data) {
                    this.orders = data.orders
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
                const { data, error, pending } = await instance.get("orders", { params: payload })

                if (data) {
                    if (payload.column_name == 'status') {
                        this.filters[payload.index][payload.column_name] = data.orders.map(tour => {
                            var newTour = { status: tour.status }
                            return newTour
                        })
                    } else {
                        this.filters[payload.index][payload.column_name] = data.orders
                    }
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
            this.fetchOrderData(1)
        },
        handleSortingUpdate(order) {
            this.order[order.index].order_type = order.order_type
            this.order[order.index].order_field = order.order_field
            this.fetchOrderData(1)
        },
        handlePagination(page) {
            this.fetchOrderData(page.pageValue)
        },
    },
    getters: {
        getOrderData() {
            if (this.orders.data) {
                var tableData = this.orders.data.map((order) => {
                    order.total_price = order.order_details.reduce(
                        (total_price, od) => total_price + od.total_price_per_pizza,
                        0,
                    );

                    return order
                })

                var paginationData = {
                    last_page: this.orders.last_page,
                    current_page: this.orders.current_page,
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
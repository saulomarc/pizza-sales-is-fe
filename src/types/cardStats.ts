export interface CardStat {
    most_ordered: {
        id?: number,
        name: string,
        pizza_id?: number,
        total_orders: string
    },
    total_orders: number,
    total_pizzas_ordered: number,
}
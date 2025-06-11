import type { MostOrdered } from "./mostOrdered";

export interface CardStat {
    top_five_most_ordered: MostOrdered[],
    most_ordered: MostOrdered,
    total_orders: number,
    total_pizzas_ordered: number,
}
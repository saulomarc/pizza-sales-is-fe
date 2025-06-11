export interface Paginated {
    current_page: number,
    data: [],
    first_page_url: string | null
    from?: number
    last_page?: number
    last_page_url: string | null
    links?: []
    next_page_url: string | null
    path?: string
    per_page?: number
    prev_page_url?: string | null
    to?: number
    total?: number
}
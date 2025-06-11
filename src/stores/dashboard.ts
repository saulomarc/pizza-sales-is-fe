import { defineStore } from 'pinia';
import { useAlertStore } from "@/stores/alert";

import router from '@/router';
import instance from '@/plugins/axios-plugin';
import axios from 'axios';
import type { CardStat } from '@/types/cardStats';

export const useDashboardStore = defineStore('dashboard', {
    state: () => {
        return {
            cards: {} as CardStat
        }
    },
    actions: {
        async fetchDashboardCardStats(): Promise<void> {
            try {
                const { data } = await instance.get('fetch-dashboard-card-stats');
                
                this.cards = data
            } catch (error) {
                if (!axios.isAxiosError(error)) {
                    const errMessage = `Something went wrong while performing your request. Please contact administrator`;
                    useAlertStore().error(errMessage)
                }
            }
        },
    }
})
import { defineStore } from 'pinia';
import { notify } from 'notiwind';

export const useAlertStore = defineStore('alert', {
    actions: {
        success (message : string) {
            notify({
                group: 'foo',
                title: 'Success',
                text: message
            }, 4000)
        },
        error (message : string) {
            notify({
                group: 'foo',
                title: 'Error',
                text: message
            }, 4000)
        },
        warning (message : string) {
            notify({
                group: 'foo',
                title: 'Warning',
                text: message
            }, 4000)
        },
        info (message : string) {
            notify({
                group: 'foo',
                title: 'Info',
                text: message
            }, 4000)
        }
    }
})
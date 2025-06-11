<template>
    <div 
    class="relative z-50" 
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true" 
    v-if="isOpen"
    >
    <div class="fixed inset-0 bg-red/50 transition-opacity bg-gray-400"></div>
    <div class="fixed z-50 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg max-w-sm w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <button @click="closeModal" class="absolute top-2 right-3">
                        <XCircleIcon class="text-gray-400 size-5" />
                    </button>
                    <div class="">
                        <div class="mt-3 text-center sm:mt-0 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title"><slot name="title"> </slot></h3>
                            <div class="mt-2">
                                <slot name="content"> </slot>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" v-if="hasFooterSlot">
                    <slot name="footer"> </slot>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { XCircleIcon } from '@heroicons/vue/20/solid'

export default {
    props: {
        isOpen: {
            type: Boolean,
        },
    },
    components: {
        XCircleIcon
    },
    data() {
        return {
            showModal: false
        }
    },
    methods:{
        toggleModal(){
            this.showModal=!this.showModal
        },
        closeModal() {
            this.$emit("onCloseModal")
        },
    },
    computed:{
        hasFooterSlot() {
            return !!this.$slots.footer
        }
    }
}
</script>

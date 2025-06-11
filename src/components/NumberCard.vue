<template>
    <div class="p-2 shadow-md rounded-lg flex drop-shadow-md border" :class="bgColor">
        <div class="hidden sm:flex items-center mr-2 px-4">
            <slot name="icon">

            </slot>
            <!-- <font-awesome-icon class="text-off-white rounded-full" size="xl" :icon="iconValue" /> -->
        </div>
        <div class="flex flex-wrap w-full bg-off-white rounded-md p-2">
            <div class="flex w-full text-xs items-center font-optimasemi">
                {{ cardText }}
            </div>
            <div v-if="numberValue" class="flex w-full text-xl md:text-2xl">
                <NumberAnimation
                    ref="number1"
                    :from="0"
                    :to="numberValue"
                    :format="numberFormat"
                    :duration="1"
                    autoplay
                    easing="linear"
                />
            </div>
            <div v-else-if="textValue" class="flex w-full text-xl md:text-2xl">
                {{ textValue }}
            </div>
        </div>
    </div>
</template>

<script setup>
import NumberAnimation from "vue-number-animation";

const props = defineProps({
    cardText: {
        type: String
    },
    numberValue: {
        type: Number
    },
    textValue: {
        type: String
    },
    iconValue: {
        type: String
    },
    bgColor: {
        type: String,
        default: 'bg-up-maroon'
    }
})

function numberFormat(number) {
    return number.toFixed(0)
}
</script>
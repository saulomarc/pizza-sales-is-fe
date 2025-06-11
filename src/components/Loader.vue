<template>
    <div class="my-2">
        <div v-if="loaderType == 'text'" class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex py-4">
                <div class="flex justify-center w-1/4">
                    <div class="rounded-full bg-blue-500 h-20 w-20"></div>
                </div>
                <div class="flex-1 space-y-6 py-1 px-2">
                    <div class="h-2 bg-blue-500 rounded"></div>
                    <div class="space-y-2">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-blue-500 rounded col-span-2"></div>
                            <div class="h-2 bg-blue-500 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-blue-500 rounded"></div>
                        <div class="h-2 bg-blue-500 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="loaderType == 'table'" class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex py-4">
                <table class="table-auto w-full items-center text-center">
                    <thead class="space-x-4">
                        <td v-for="cn in columnNum" v-bind:key="cn">
                            <div class="h-3 bg-blue-500 rounded mx-2"></div>
                        </td>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="cn in columnNum" v-bind:key="cn">
                                <div class="h-2 bg-blue-500 rounded m-2"></div>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="cn in columnNum" v-bind:key="cn">
                                <div class="h-2 bg-blue-500 rounded m-2"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="loaderType == 'filters'" class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div class="flex animate-pulse">
                <div v-for="cn in columnNum" v-bind:key="cn" class="h-6 bg-blue-500 rounded mx-2 p-2 w-32 flex items-center justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div class="h-6 bg-blue-500 rounded mx-2 w-28"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
        loaderType: {
            type: String,
            default: 'text'
        },
        columnNum: {
            type: Number,
            default: 4
        }
    },
}
</script>
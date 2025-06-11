<template>
	<div v-show="isLoading" class="relative flex justify-center items-center">
		<div v-if="size == 'large'" :style="'border-top-color: ' + color " class="loader ease-linear rounded-full border-4 border-t-4 border-up-maroon h-12 w-12 mx-4"></div>
		<div v-else :style="'border-top-color: ' + color " class="loader ease-linear rounded-full border-4 border-t-4 border-up-maroon h-10 w-10 mx-4"></div>
    </div>
</template>
<script>
export default {
	props: {
        isLoading: {
            type: Boolean,
            default: false
        },
		size: {
			type: String,
			default: 'small'
		},
		color: {
			type: String,
			default: '#ffb61c'
		}
    },
}
</script>

<style scoped>
.loader {
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
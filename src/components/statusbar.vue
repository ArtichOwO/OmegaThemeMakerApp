<template>
	<div class="grayContainer" id="statusBar">
		<span>{{ status }}</span>
	</div>
</template>

<script>
	export default {
		name: statusbar,

		computed: {
			status() {
				return this.$store.state.status
			}
		}
	}
</script>

<style>
	#statusBar {
		color: #FFFFFF;
	}
</style>
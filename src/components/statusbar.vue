<template>
	<div class="grayContainer" id="statusBar">
		<div class="consoleElement" v-for="key in Object.keys(this.status)">
			<span class="consoleLineNumber">{{ key }}</span>
			<strong v-html="this.status[key]"></strong>
		</div>
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
		flex-grow: 1;
		overflow: scroll;
	}

	.consoleElement {
		display: flex;
		margin-bottom: 3px;
	}

	.consoleLineNumber {
		text-align: center;
		min-width: 15px;
		margin-right: 8px;
		color: #888888;
	}

	#statusBar a:any-link {
	  color: #FFFFFF;
	}
</style>

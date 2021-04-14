<!-- TODO: Too much duplicates, needs some cleaning -->

<template>
	<div class="elemContainer">
		<div v-if="isString" class="colorDiv">
			<span class="elemTitle"><strong> {{ stringContent }} : </strong></span>
			<input :id="stringContent.toLowerCase()" type="text" name="" :value="this.$store.state.theme[stringContent.toLowerCase()]" @input="updateString(stringContent.toLowerCase(), $event.target.value)" >
			<div class="separator" />
		</div>

		<span v-else>
			<div v-if="typeof colors[colorName] === 'string'" class="colorDiv">
				<span class="elemTitle"><strong> {{ colorName }} : </strong></span>
				<input :id="colorName" type="color" name="" :value="'#'+colors[colorName]" @input="updateColor(colorName, $event.target.value)" >
				<div class="separator" />
				<img src="../assets/editorElem/copybutton.svg" alt="Copy" class="elemButton noselect" @click="copyColor(colorName)">
				<img src="../assets/editorElem/pastebutton.svg" alt="Paste" class="elemButton noselect" @click="pasteColor(colorName)">
				<img src="../assets/editorElem/resetbutton.svg" alt="Paste" class="elemButton noselect" @click="resetColor(colorName)">
			</div>

			<div v-else>
				<span class="elemTitle"><strong> {{ colorName }} : </strong></span>
				<hr>
				<div v-for="colorItem in Object.keys(colors[colorName])" class="colorDiv">
					<span class="elemTitle">{{ colorItem }} : </span>
					<input :id="colorName + '-' + colorItem" type="color" :value="'#'+colors[colorName][colorItem]" @input="updateColor(colorName, $event.target.value, colorItem)">
					<div class="separator" />
					<img src="../assets/editorElem/copybutton.svg" alt="Copy" class="elemButton noselect" @click="copyColor(colorName + '-' + colorItem)">
					<img src="../assets/editorElem/pastebutton.svg" alt="Paste" class="elemButton noselect" @click="pasteColor(colorName, colorItem)">
					<img src="../assets/editorElem/resetbutton.svg" alt="Paste" class="elemButton noselect" @click="resetColor(colorName, colorItem)">
				</div>
			</div>
		</span>
	</div>
</template>

<script>
	export default {
		name: "editorElement",

		props: {
			colorName: String,
			isString: Boolean,
			stringContent: String
		},

		computed: {
			colors() {
	    	return this.$store.state.theme.colors
	    },
		},

		methods: {
			updateColor(pColorName, pValue, pSubColorName = undefined) {
	  		if (pValue.length != 6) {
	  			pValue = pValue.substring(1, 7)
	  		}
	  		if (pSubColorName == undefined) {
	  			this.$store.state.theme.colors[pColorName] = pValue
	  		} else {
	  			this.$store.state.theme.colors[pColorName][pSubColorName] = pValue
	  		}
	  	},

	  	updateString(pElemName, pValue) {
	  		this.$store.state.theme[pElemName] = pValue
	  	},

	  	copyColor(pColorName) {
	  		let value = document.getElementById(pColorName).value
	  		const el = document.createElement('textarea')
			  el.value = value
			  document.body.appendChild(el)
			  el.select()
			  document.execCommand('copy')
			  document.body.removeChild(el)
			  this.$store.commit("addLnToStatus", "Copied value : " + value)
	  	},

	  	pasteColor(pColorName, pSubColorName = undefined) {
	  		navigator.clipboard.readText()
				  .then(text => {
				    this.updateColor(pColorName, text, pSubColorName)
				    this.$store.commit("addLnToStatus", "Pasted value : " + text)
				  })
				  .catch(err => {
				    $store.commit("addLnToStatus", '<span style=\"color: #FF0000;\">Failed to read clipboard contents: ' + err + '</span>')
				  });
	  	},

	  	resetColor(pColorName, pSubColorName = undefined) {
	  		if (pSubColorName == undefined) {
	  			this.$store.state.theme.colors[pColorName] = this.$store.state.originalTheme.colors[pColorName]
	  		} else {
	  			this.$store.state.theme.colors[pColorName][pSubColorName] = this.$store.state.originalTheme.colors[pColorName][pSubColorName]
	  		}
	  	}
		}
	}
</script>

<style>
	.elemContainer {
		border-radius: 15px;
		background-color: #AAAAAA;
		color: #333333;
		padding: 15px;
		margin: 15px;
		max-width: 550px;
		flex-grow: 1;
	}

	.colorDiv {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	.elemButton {
		width: 30px;
		height: auto;
		margin: 5px;
		cursor: pointer;
	}

	.separator {
		flex-grow: 1;
	}

	.elemTitle {
		margin-right: 5px;
	}
</style>
<template>
	<div id="editorContainer" class="grayContainer">
		<div class="noselect">
			<button @click="switchEditor(true)">Color editor</button>
			<button @click="switchEditor(false)">JSON editor</button>
			<hr>
		</div>

		<div id="colorEditor" ref="colorEditor">
			<editorElement :isString="true" stringContent="Name" />
			<editorElement :isString="true" stringContent="Icons" />

			<editorElement :colorName="color" v-for="color in Object.keys(colors)"/>
		</div>

		<!-- <textarea ref="JSONEditor" id="JSONEditor" placeholder="Type your JSON theme here..." @input="updateInputJSON">{{ stringifiedJSON }}</textarea>-->

		<span ref="JSONEditor" id="JSONEditor" @input="updateInputJSON" contenteditable>{{ JSON.stringify(this.$store.state.theme, null, 4) }}</span>
	</div>
</template>

<script>
	import editorElement from "./editor-element.vue"

	export default {
		name: "editor",

		components: {
			editorElement
		},

	  computed: {
	    stringifiedJSON() {
	      return JSON.stringify(this.$store.state.theme, null, 4)
	    },
	    colors() {
	    	return this.$store.state.theme.colors
	    },
	  },

	  methods: {
	  	updateInputJSON() {
	  		let content = document.getElementById("JSONEditor").innerHTML
	  		this.$store.state.theme = JSON.parse(content)
	  	},

	  	switchEditor(pWhich) {
	  		if (pWhich) {
	  			this.$refs.JSONEditor.style.display = "none"
	  			this.$refs.colorEditor.style.display = "flex"
	  			this.$store.state.discordRpc = !this.$store.state.discordRpc
	  		} else {
	  			this.$refs.JSONEditor.style.display = "block"
	  			this.$refs.colorEditor.style.display = "none"
	  			this.$store.state.discordRpc = !this.$store.state.discordRpc
	  		}
	  	}
	  }
	}
</script>

<style>

#editorContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#JSONEditor:focus {
  outline: none !important;
  border: none;
}

#JSONEditor {
  box-sizing: border-box;
  resize: none;
  background-color: transparent;
  color: white;
  border: none;
  white-space: pre;
  display: none;
  width: auto;
  flex-grow: 1;
  overflow: scroll;
}

#colorEditor {
	width: 100%;
  height: 100%;
  border-radius: 15px;

	overflow: auto;

	flex-grow: 1;

	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
}

button {
  background-color: transparent;
  border: 2px solid #AAAAAA;
  border-radius: 5px;
  color: #FFFFFF;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 5px;
  margin-right: 5px;
  transition-duration: 0.1s;
}

button:hover {
	background-color: #AAAAAA;
	color: #333333;
}

</style>
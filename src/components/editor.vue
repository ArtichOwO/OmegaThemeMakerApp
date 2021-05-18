<template>
  <div id="editorContainer" class="grayContainer">
    <div class="noselect">
      <button @click="switchEditor(true)">Color editor</button>
      <button @click="switchEditor(false)">JSON editor</button>
      <hr />
    </div>

    <div id="metaEditor" ref="metaEditor">
      <editorElement :isString="true" stringContent="Name" />
      <editorElement :isString="true" stringContent="Icons" />
    </div>
    <div id="colorEditor" ref="colorEditor">
      <editorElement
        :colorName="color"
        v-for="color in Object.keys(colors)"
        :key="color"
      />
    </div>

    <span
      ref="JSONEditor"
      id="JSONEditor"
      @input="updateInputJSON"
      contenteditable
      >{{ stringifiedJSON }}</span
    >
  </div>
</template>

<script>
import editorElement from "./editor-element.vue";

export default {
  name: "editor",

  components: {
    editorElement,
  },

  computed: {
    stringifiedJSON() {
      return JSON.stringify(this.$store.state.theme, null, 4);
    },
    colors() {
      return this.$store.state.theme.colors;
    },
  },

  methods: {
    updateInputJSON() {
      let content = document.getElementById("JSONEditor").innerHTML;
      this.$store.state.theme = JSON.parse(content);
    },

    switchEditor(pWhich) {
      if (pWhich) {
        this.$refs.JSONEditor.style.display = "none";
        this.$refs.colorEditor.style.display = "flex";
        this.$refs.metaEditor.style.display = "flex";
        this.$store.state.discordRpc = !this.$store.state.discordRpc;
      } else {
        this.$refs.JSONEditor.style.display = "block";
        this.$refs.colorEditor.style.display = "none";
        this.$refs.metaEditor.style.display = "none";
        this.$store.state.discordRpc = !this.$store.state.discordRpc;
      }
    },
  },
};
</script>

<style>
#editorContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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

#JSONEditor:focus {
  outline: none !important;
  border: none;
}

#metaEditor {
  display: flex;
  border-radius: 15px;
  background-color: #555;
  box-shadow: 0px 15px 51px -22px #000;
  z-index: 1000;
}

#colorEditor {
  width: 100%;
  height: 100%;
  border-radius: 15px;

  overflow: scroll;

  flex-grow: 1;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

button {
  background-color: transparent;
  border: 2px solid #aaaaaa;
  border-radius: 5px;
  color: #ffffff;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 5px;
  margin-right: 5px;
  transition-duration: 0.1s;
}

button:hover {
  background-color: #aaaaaa;
  color: #333333;
}
</style>

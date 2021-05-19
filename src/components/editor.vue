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

    <prism-editor
      id="JSONEditor"
      v-model="code"
      @input="updateInputJSON"
      :highlight="highlighter"
      :tabSize="4"
      line-numbers
    ></prism-editor>
  </div>
</template>

<script>
import editorElement from "./editor-element.vue";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default {
  name: "editor",

  components: {
    editorElement,
    PrismEditor,
  },

  data() {
    return {
      code: JSON.stringify(this.$store.state.theme, null, 4),
    };
  },

  computed: {
    colors() {
      return this.$store.state.theme.colors;
    },
  },

  methods: {
    updateInputJSON() {
      let content = document
        .getElementById("JSONEditor")
        .getElementsByTagName("textarea")[0].value;
      this.$store.state.theme = JSON.parse(content);
    },

    switchEditor(pWhich) {
      if (pWhich) {
        document.getElementById("JSONEditor").style.display = "none";
        this.$refs.colorEditor.style.display = "flex";
        this.$refs.metaEditor.style.display = "flex";
        this.$store.state.discordRpc = !this.$store.state.discordRpc;
      } else {
        document.getElementById("JSONEditor").style.display = "flex";
        this.$refs.colorEditor.style.display = "none";
        this.$refs.metaEditor.style.display = "none";
        this.$store.state.discordRpc = !this.$store.state.discordRpc;
      }
    },

    highlighter(code) {
      return highlight(code, languages.js);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap");

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
  font-family: "Fira Code", sans-serif;
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

.prism-editor__textarea:focus {
  overflow: auto;
  outline: none;
}

.prism-editor__line-numbers {
  overflow: initial !important;
}
</style>

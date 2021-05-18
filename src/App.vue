<template>
  <div id="mainContainer">
    <editor />

    <div id="secondPanel">
      <toolbar />
      <vueCanvas />
      <statusbar />
    </div>
  </div>
</template>

<script>
import editor from "./components/editor.vue";
import toolbar from "./components/toolbar.vue";
import vueCanvas from "./components/canvas.vue";
import statusbar from "./components/statusbar.vue";

export default {
  name: "App",

  components: {
    editor,
    toolbar,
    vueCanvas,
    statusbar,
  },

  methods: {
    setStatus(val) {
      console.log(val);
      this.$store.state.status = val;
    },
  },

  mounted() {
    this.$store.state.originalTheme = JSON.parse(
      JSON.stringify(this.$store.state.theme)
    );

    window.ipcRenderer.on("importJSON", (event, arg) => {
      try {
        this.$store.state.theme = JSON.parse(arg);
        this.$store.state.originalTheme = JSON.parse(arg);
      } catch (e) {
        this.$store.commit(
          "addLnToStatus",
          '<span style="color: #FF0000;">' + e + "</span>"
        );
      }
    });

    window.ipcRenderer.on("run", () => {
      this.$store.getters.runSimulator;
    });

    window.ipcRenderer.on("addLnToStatus", (arg) => {
      this.$store.commit("addLnToStatus", arg);
    });

    window.ipcRenderer.on("newChosenColor", (arg) => {
      const el = document.createElement("textarea");
      el.value = arg;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      this.$store.commit("addLnToStatus", "Copied value : " + arg);
      document.body.removeChild(el);
    });

    window.ipcRenderer.on("getDiscordRPC", () => {
      window.ipcRenderer.send("returnRPCValue", [
        this.$store.state.discordRpc,
        this.$store.state.theme.name,
      ]);
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300&display=swap");

html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #252526;
  font-family: "Fira Sans", sans-serif;
}

#mainContainer {
  display: flex;
  align-items: row;
  height: 100%;
}

#secondPanel {
  display: flex;
  flex-direction: column;
  flex-basis: calc((15px * 2) + 320px);
}

/*** Classes ***/

.grayContainer {
  background-color: #333333;
  border-radius: 15px;

  padding: 15px;
  margin: 15px;
}

.contextMenu--inactive {
  display: none;
}

.contextMenu--active {
  display: block;
  background-color: #aaaaaa;
  color: white;
  opacity: 0.9;
  border-radius: 5px;
  width: auto;
  height: auto;
  padding: 15px;
  position: absolute;
}

.colorPicker {
  border-radius: 5px;
  margin-right: 10px;
}

.text-bold {
  font-weight: bold;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>

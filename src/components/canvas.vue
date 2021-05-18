<template>
  <div ref="canvasContainer" class="grayContainer">
    <canvas
      ref="canvas"
      id="canvas"
      oncontextmenu="event.preventDefault()"
    ></canvas>
  </div>
</template>

<script>
import * as simulator from "../external-js/epsilon.js";

export default {
  name: "vueCanvas",

  data() {
    return {
      Module: null,
      Theme: this.$store.state.theme,
    };
  },

  computed: {
    runTrigger() {
      return this.$store.state.runTrigger;
    },
  },

  watch: {
    runTrigger: function () {
      this.run();
    },
  },

  methods: {
    traverseColors(root, data) {
      if (this.$store.state.theme.version == 2) {
        for (let i in data) {
          let v = data[i];

          if (typeof v === "string" || v instanceof String) {
            console.log(root);
            if (root == "Main") {
              this.Theme[i] = parseInt(v, 16);
            } else {
              if (i == "Main") {
                this.Theme[root] = parseInt(v, 16);
              } else {
                this.Theme[root + i] = parseInt(v, 16);
              }
            }
          } else {
            this.traverseColors(root + i, v);
          }
        }
      } else {
        for (let i in data) {
          let v = data[i];

          if (typeof v === "string" || v instanceof String) {
            this.Theme[root + i] = parseInt(v, 16);
          } else {
            this.traverseColors(root + i, v);
          }
        }
      }
    },

    loadTheme() {
      let content = this.$store.state.theme;
      if ("colors" in content) {
        this.Theme = {};
        this.traverseColors("", content["colors"]);
        return true;
      } else {
        this.$store.commit(
          "addLnToStatus",
          '<span style="color: #FF0000;">No colors in theme!</span>'
        );
        return false;
      }
    },

    run() {
      this.$store.commit("addLnToStatus", "Running...");

      document.getElementById("canvas").remove();
      let newCanvas = document.createElement("canvas");
      newCanvas.id = "canvas";
      if (this.$store.state.isFullscreen) {
        newCanvas.style.width = "640px";
        newCanvas.style.height = "480px";
      }
      newCanvas.setAttribute("oncontextmenu", "event.preventDefault()");
      this.$refs.canvasContainer.appendChild(newCanvas);

      if (this.Module != null) {
        this.Module._IonSimulatorEventsPushEvent(217);
        delete this.Module;
        this.Module = null;
      }

      if (this.loadTheme()) {
        console.log(this.Theme);

        var epsilonLanguage =
          document.documentElement.lang ||
          window.navigator.language.split("-")[0];
        var _this = this;
        this.Module = {
          canvas: newCanvas,
          arguments: ["--language", epsilonLanguage],
          onColorRequest: function (name) {
            if (name in _this.Theme) {
              return _this.Theme[name];
            } else {
              _this.$store.commit(
                "addLnToStatus",
                '<span style="color: #FF0000;">Unknown color "' +
                  name +
                  '"</span>'
              );
              _this.Module._IonSimulatorEventsPushEvent(217);
              delete _this.Module;
              _this.Module = null;
              return 0xff00ff;
            }
          },
        };
        simulator(this.Module);
      }
    },
  },
};
</script>

<style>
#canvas {
  width: 320px;
  height: 240px;
  background-color: white;
  border-radius: 5px;
  transition-duration: 0.1s;
}
</style>

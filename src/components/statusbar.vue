<template>
  <div class="grayContainer" id="statusBar">
    <div
      class="consoleElement"
      v-for="key in Object.keys(this.status)"
      :key="key"
    >
      <span class="consoleLineNumber">{{ key }}</span>
      <span class="text-bold" v-html="this.status[key]"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: statusbar,

  computed: {
    status() {
      return this.$store.state.status;
    },
  },
};
</script>

<style>
#statusBar {
  color: #ffffff;
  flex-grow: 1;
  overflow: scroll;
  font-family: "Fira Code", sans-serif;
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
  color: #ffffff;
}
</style>

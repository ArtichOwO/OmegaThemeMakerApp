<template>
	<div id="toolBar" class="grayContainer noselect">
		<img src="../assets/toolBar/launchbutton.png" alt="toolBar" id="runButton" @click="run">
    <label for="importButton">
      <img src="../assets/toolBar/importfile.png" id="imageImportButton" alt="Import">
    </label>
    <input type="file" name="Import" id="importButton" @input="importFile">
    <img src="../assets/toolBar/savebutton.png" alt="Save" id="saveButton" @click="save">
    <img src="../assets/toolBar/screenshotbutton.png" alt="ScrnShot" @click="screenshot">
    <img src="../assets/toolBar/fullscreen.png" alt="FullScrn" @click="fullscreen">
	</div>
</template>

<script>

	export default {
		name: "toolbar",

	  methods: {
	  	run() {
        this.$store.commit("runTrigger")
			},

      importFile() {
        let file = document.getElementById("importButton").files[0]
        let textType = /json.*/
        
        if (file.type.match(textType)) {
            let reader = new FileReader()
            let _this = this
            reader.onload = function(e) {
                let content = reader.result
                _this.$store.state.theme = JSON.parse(content)
                _this.$store.state.originalTheme = JSON.parse(content)
                _this.$store.commit("addLnToStatus", "Imported " + _this.$store.state.theme.name + " from " + file.name)
            }
            
            reader.readAsText(file)
        } else {
            this.$store.commit("addLnToStatus", "<span style=\"color: #FF0000;\">File not supported!</span>")
            return false
        }
      },

      save() {
        let theme = this.$store.state.theme
        let content = JSON.stringify(theme, null, 4)
        let fileName = theme.name.toLowerCase().replaceAll(" ", "_") + ".json"

        let blob = new Blob([content], { type: 'text/json' })
        this.$store.commit("addLnToStatus", "Saved " + theme.name + " as " + fileName)
        let a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        a.style.display = "none"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      },

      screenshot() {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        let yyyy = today.getFullYear()
        let hh = today.getHours()
        let mn = today.getMinutes()
        let sec = today.getSeconds()
        today = yyyy + mm + dd + '-' + hh + mn + sec

        let canvas = document.getElementById('canvas')
        let link = document.createElement('a')
        link.download = 'screenshot-'+today+'.png'
        link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        this.$store.commit("addLnToStatus", "Took screenshot at " + today)
        link.click()
      },

      fullscreen() {
        let canvas = document.getElementById('canvas')
        if (this.$store.state.isFullscreen) {
          canvas.style.width = "320px"
          canvas.style.height = "240px"
          this.$store.state.isFullscreen = false
        } else {
          canvas.style.width = "640px"
          canvas.style.height = "480px"
          this.$store.state.isFullscreen = true
        }
        this.$store.commit("addLnToStatus", "Fullscreen : " + this.$store.state.isFullscreen)
      }
	  },

    mounted() {
      window.ipcRenderer.on('fullscreen', (event, arg) => {
        this.fullscreen()
      })

      window.ipcRenderer.on('save', (event, arg) => {
        this.save()
      })

      window.ipcRenderer.on('screenshot', (event, arg) => {
        this.screenshot()
      })
    }
	}
</script>

<style>

#toolBar {
  display: flex;
  align-items: stretch;
  padding: 12px !important;
}

#importButton {
  display: none;
}

#toolBar > img, #toolBar > label > img {
  height: 20px;
  width: auto;
  margin-right: 10px;
  cursor: pointer;
}

</style>
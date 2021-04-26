## Source code documentation

```
.  
├── package.json # App infos and other things  
├── vue.config.js # Vue and Electron-Builder configuration  
├── webpack.config.js # Idk wtf is this  
├── README.md # A readme file...  
├── public # Application "base"  
│   ├── favicon.ico # Icon for web version  
│   └── index.html # Base HTML file (the app will be in div#app)  
├── src # Source code  
│   ├── background.js # Electron launch file (and other cool things)  
│   ├── main.js # Vue launch file  
│   ├── preload.js # Connect ipcRenderer to window
│   ├── App.vue # Main component  
│   ├── assets # Resources folder  
│   │   └── ...  
│   ├── external-js # External JavaScript  
│   │   └── epsilon.js # Simulator  
│   ├── store # Vuex store folder  
│   │   └── index.js # Here's the store (theme is located here)  
│   └── components # Components  
│       ├── canvas.vue # Simulator canvas  
│       ├── toolbar.vue # Toolbar  
│       ├── statusbar.vue # Status bar  
│       ├── editor.vue # Editor (JSON + GUI)  
│       └── editor-element.vue # Editor component  
├── build # Build resources  
│   └── icon.* # Icon files  
├── yarn.lock # Don't touch that please  
├── node_modules # Nor that  
└── dist_electron # Output folder  
```
import { createStore } from 'vuex'

export default createStore({
  state: {
  	"runTrigger": false,
  	"isFullscreen": false,
  	"discordRpc": false,
  	"status": {
  		0:"<span style=\"color: #00b2b0;\">Welcome to Omega Theme Maker</span>",
  		1:"For more information check its <a target=\"_blank\" href=\"https://github.com/ArtichOwO/OmegaThemeMakerApp/\">Github repository</a>",
  		2:"You can also join our <a target=\"_blank\" href=\"https://discord.gg/u5Hxn2Cmt3\">Discord server</a>!<br /> We mainly talk French there, but feel free to come and talk in English!"
  	},
  	"theme": {
  		"name": "Omega Light",
		  "icons": "omega_light",
		  "colors": {
		    "PrimaryText": "000000",
		    "SecondaryText": "6e6e6e",
		    "AccentText": "00857f",
		    "ApproximateSignText": "595959",
		    "ApproximateExpressionText": "595959",
		    "Background": {
		      "Hard": "ffffff",
		      "Apps": "fafafa",
		      "AppsSecondary": "f0f0f0"
		    },
		    "Toolbar": {
		      "": "c03535",
		      "Text": "ffffff"
		    },
		    "ExpressionInput": {
		      "Background": "e0e0e0",
		      "Border": "d9d9d9"
		    },
		    "Grid": {
		      "PrimaryLine": "d9d9d9",
		      "SecondaryLine": "f5f5f5"
		    },
		    "Battery": {
		      "": "ffffff",
		      "InCharge": "179e1f",
		      "Low": "992321"
		    },
		    "ScrollBar": {
		      "Foreground": "4a4a4a",
		      "Background": "d9d9d9"
		    },
		    "Control": {
		      "": "00857f",
		      "Enabled": "00b2b0",
		      "Disabled": "9e9e9e"
		    },
		    "Calculation": {
		      "BackgroundOdd": "fafafa",
		      "BackgroundEven": "ffffff",
		      "EmptyBox": "c4c4c4",
		      "EmptyBoxNeeded": "00857f",
		      "TrigoAndComplexForeground": "ff000c"
		    },
		    "Code": {
		      "Background": "ffffff",
		      "BackgroundSelected": "e0e0e0",
		      "Text": "000000",
		      "Comment": "999988",
		        "Number": "009999",
		      "Keyword": "ff000c",
		      "Operator": "d73a49",
		      "String": "032f62",
		      "GutterViewBackground": "E4E6E7",
		      "AutocompleteColor": "c6c6c6"
		    },
		    "Probability": {
		      "Curve": "00857f",
		      "CellBorder": "ececec",
		      "HistogramBar": "d9d9d9"
		    },
		    "Statistics": {
		      "Box": "00857f",
		      "BoxVerticalLine": "d9d9d9",
		      "Selected": "00857f",
		      "NotSelected": "f5f5f5"
		    },
		    "Graph": {
		      "Tangent": "595959"
		    },
		    "SubMenu": {
		      "Background": "e0e0e0",
		      "Border": "fafafa",
		      "Text": "000000"
		    },
		    "Toolbox": {
		      "HeaderBackground": "4a4a4a",
		      "HeaderText": "ffffff",
		      "HeaderBorder": "4a4a4a",
		      "Background": "000000"
		    },
		    "List": {
		      "CellBackground": "ffffff",
		      "CellBackgroundSelected": "e0e0e0",
		      "CellBorder": "ededef"
		    },
		    "Button": {
		      "Background": "e6e6e6",
		      "BackgroundSelected": "c9c9c9",
		      "BackgroundSelectedHighContrast": "00b2b0",
		      "Border": "adadad",
		      "RowBorder": "d9d9d9",
		      "BorderOut": "f5f5f5",
		      "Shadow": "003833",
		      "Text": "000000"
		    },
		    "Tab": {
		      "Background": "4a4a4a",
		      "BackgroundSelected": "757575",
		      "BackgroundActive": "fafafa",
		      "BackgroundSelectedAndActive": "e3e3e3",
		      "Text": "ffffff",
		      "TextActive": "000000"
		    },
		    "SubTab": {
		      "Background": "e0e0e0",
		      "BackgroundSelected": "d1d1d1",
		      "Text": "000000"
		    },
		    "Banner": {
		      "FirstBackground": "4a4a4a",
		      "FirstBorder": "4a4a4a",
		      "FirstText": "ffffff",
		      "FirstVariantBackground": "4a4a4a",
		      "FirstVariantBorder": "fafafa",
		      "FirstVariantText": "ffffff",
		      "SecondBackground": "e0e0e0",
		     "SecondBorder": "fafafa",
		      "SecondText": "000000"
		    },
		    "Home": {
		     "Background": "ffffff",
		     "CellBackground": "ffffff",
		      "CellBackgroundActive": "4a4a4a",
		      "CellText": "000000",
		      "CellTextActive": "ffffff",
		      "CellTextExternal": "008f87",
		      "CellTextExternalActive": "6fe6df"
		    },
		    "Atom": {
		      "Unknown": "eeeeee",
		      "Text": "000000",
		      "AlkaliMetal": "ffaa00",
		      "AlkaliEarthMetal": "f6f200",
		      "Lanthanide": "ffaa8b",
		      "Actinide": "deaacd",
		      "TransitionMetal": "de999c",
		      "PostTransitionMetal": "9cbaac",
		      "Metalloid": "52ce8b",
		      "Halogen": "00debd",
		      "ReactiveNonmetal": "00ee00",
		      "NobleGas": "8baaff",
		      "TableLines": "323532",
		      "Highlight": "000000",
		      "Background": "d9d9d9"
		    }
		  }
  	},

  	"originalTheme": {
  		"name": "Omega Light",
		  "icons": "omega_light",
		  "colors": {
		    "PrimaryText": "000000",
		    "SecondaryText": "6e6e6e",
		    "AccentText": "00857f",
		    "ApproximateSignText": "595959",
		    "ApproximateExpressionText": "595959",
		    "Background": {
		      "Hard": "ffffff",
		      "Apps": "fafafa",
		      "AppsSecondary": "f0f0f0"
		    },
		    "Toolbar": {
		      "": "c03535",
		      "Text": "ffffff"
		    },
		    "ExpressionInput": {
		      "Background": "e0e0e0",
		      "Border": "d9d9d9"
		    },
		    "Grid": {
		      "PrimaryLine": "d9d9d9",
		      "SecondaryLine": "f5f5f5"
		    },
		    "Battery": {
		      "": "ffffff",
		      "InCharge": "179e1f",
		      "Low": "992321"
		    },
		    "ScrollBar": {
		      "Foreground": "4a4a4a",
		      "Background": "d9d9d9"
		    },
		    "Control": {
		      "": "00857f",
		      "Enabled": "00b2b0",
		      "Disabled": "9e9e9e"
		    },
		    "Calculation": {
		      "BackgroundOdd": "fafafa",
		      "BackgroundEven": "ffffff",
		      "EmptyBox": "c4c4c4",
		      "EmptyBoxNeeded": "00857f",
		      "TrigoAndComplexForeground": "ff000c"
		    },
		    "Code": {
		      "Background": "ffffff",
		      "BackgroundSelected": "e0e0e0",
		      "Text": "000000",
		      "Comment": "999988",
		        "Number": "009999",
		      "Keyword": "ff000c",
		      "Operator": "d73a49",
		      "String": "032f62",
		      "GutterViewBackground": "E4E6E7",
		      "AutocompleteColor": "c6c6c6"
		    },
		    "Probability": {
		      "Curve": "00857f",
		      "CellBorder": "ececec",
		      "HistogramBar": "d9d9d9"
		    },
		    "Statistics": {
		      "Box": "00857f",
		      "BoxVerticalLine": "d9d9d9",
		      "Selected": "00857f",
		      "NotSelected": "f5f5f5"
		    },
		    "Graph": {
		      "Tangent": "595959"
		    },
		    "SubMenu": {
		      "Background": "e0e0e0",
		      "Border": "fafafa",
		      "Text": "000000"
		    },
		    "Toolbox": {
		      "HeaderBackground": "4a4a4a",
		      "HeaderText": "ffffff",
		      "HeaderBorder": "4a4a4a",
		      "Background": "000000"
		    },
		    "List": {
		      "CellBackground": "ffffff",
		      "CellBackgroundSelected": "e0e0e0",
		      "CellBorder": "ededef"
		    },
		    "Button": {
		      "Background": "e6e6e6",
		      "BackgroundSelected": "c9c9c9",
		      "BackgroundSelectedHighContrast": "00b2b0",
		      "Border": "adadad",
		      "RowBorder": "d9d9d9",
		      "BorderOut": "f5f5f5",
		      "Shadow": "003833",
		      "Text": "000000"
		    },
		    "Tab": {
		      "Background": "4a4a4a",
		      "BackgroundSelected": "757575",
		      "BackgroundActive": "fafafa",
		      "BackgroundSelectedAndActive": "e3e3e3",
		      "Text": "ffffff",
		      "TextActive": "000000"
		    },
		    "SubTab": {
		      "Background": "e0e0e0",
		      "BackgroundSelected": "d1d1d1",
		      "Text": "000000"
		    },
		    "Banner": {
		      "FirstBackground": "4a4a4a",
		      "FirstBorder": "4a4a4a",
		      "FirstText": "ffffff",
		      "FirstVariantBackground": "4a4a4a",
		      "FirstVariantBorder": "fafafa",
		      "FirstVariantText": "ffffff",
		      "SecondBackground": "e0e0e0",
		     "SecondBorder": "fafafa",
		      "SecondText": "000000"
		    },
		    "Home": {
		     "Background": "ffffff",
		     "CellBackground": "ffffff",
		      "CellBackgroundActive": "4a4a4a",
		      "CellText": "000000",
		      "CellTextActive": "ffffff",
		      "CellTextExternal": "008f87",
		      "CellTextExternalActive": "6fe6df"
		    },
		    "Atom": {
		      "Unknown": "eeeeee",
		      "Text": "000000",
		      "AlkaliMetal": "ffaa00",
		      "AlkaliEarthMetal": "f6f200",
		      "Lanthanide": "ffaa8b",
		      "Actinide": "deaacd",
		      "TransitionMetal": "de999c",
		      "PostTransitionMetal": "9cbaac",
		      "Metalloid": "52ce8b",
		      "Halogen": "00debd",
		      "ReactiveNonmetal": "00ee00",
		      "NobleGas": "8baaff",
		      "TableLines": "323532",
		      "Highlight": "000000",
		      "Background": "d9d9d9"
		    }
		  }
  	}
  },
  mutations: {
  	RUN_SIMULATOR(state, payload) {
	    state.runTrigger = payload.func
	  },

	  addLnToStatus(state, pValue) {
	  	console.log(pValue)
	  	let statusConsole = document.getElementById("statusBar")
	  	statusConsole.scrollTop = statusConsole.scrollHeight
	  	state.status[Object.keys(state.status).length] = pValue
	  }
  },
  actions: {
  	runSimulator: (context, payload) => {
	    context.commit('RUN_SIMULATOR', payload)
	  }
  },
  getters: {
	  runSimulator: state => state.runTrigger(),
	}
})

export var store = createStore();

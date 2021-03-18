var Module = null;
var Theme = {};

function updateColorValue() {
    let value = document.getElementById("colorPicker").value;
    document.getElementById("colorPickerValue").innerHTML = value;
}

function saveJSON() {
    let content = document.getElementById("JSONEditor").value;
    let theme = JSON.parse(document.getElementById("JSONEditor").value);
    let fileName = theme.icons + ".json";

    let blob = new Blob([content], { type: 'text/json' });
    let a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importJSON() {
    let file = document.getElementById("importButton").files[0];
    let textType = /json.*/;
    
    if (file.type.match(textType)) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
            let content = reader.result;
            document.getElementById("JSONEditor").value = content;
        }
        
        reader.readAsText(file);    
    } else {
        setStatus("File not supported!")
        return false;
    }
}

function traverseColors(root, data) {
    for (i in data) {
        let v = data[i];
        
        if (typeof v === "string" || v instanceof String) {
            Theme[root + i] = parseInt(v, 16);
        } else {
            traverseColors(root + i, v);
        }
    }
}

function parseTheme(theme) {
    if ("colors" in theme) {
        try {
            Theme = {};
            traverseColors("", theme["colors"]);
            return true;
        } catch (e) {
            setStatus("Error while parsing colors!");
            console.log(e);
            return false;
        }
    } else {
        setStatus("No colors in theme!");
        return false;
    }
}

function setStatus(val) {
    document.getElementById("status").textContent = val;
}

function loadTheme() {
    let content = document.getElementById("JSONEditor").value;

    try {
        let data = JSON.parse(content);
        return parseTheme(data)
    } catch(e) {
        setStatus("Error parsing JSON!");
        return false;
    }
}

function run() {
    setStatus("Running...")

    if (Module != null) {
        Module._IonSimulatorEventsPushEvent(217);
        delete Module;
        Module = null;
    }
    
    if (loadTheme()) {
        console.log(Theme);
        var mainCanvas = document.getElementById('canvas');
        var epsilonLanguage = document.documentElement.lang || window.navigator.language.split('-')[0];
        Module = {
            canvas: mainCanvas,
            arguments: ['--language', epsilonLanguage],
            onColorRequest: function(name) {
                if (name in Theme) {
                    return Theme[name];
                } else {
                    setStatus("Unknown color \"" + name +"\"");
                    Module._IonSimulatorEventsPushEvent(217);
                    delete Module;
                    Module = null;
                    return 0xFF00FF;
                }
            }
        }
        Epsilon(Module);
    }
}
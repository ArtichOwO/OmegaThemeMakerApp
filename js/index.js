var Module = null;
var Theme = {};
var selectionOffsets = [];

var modal = document.getElementById('contextMenu');
var textarea = document.getElementById("JSONEditor");

function screenshot() {
  Module._IonDisplayForceRefresh();
  var canvas = document.getElementById('canvas');
  var link = document.createElement('a');
  link.download = 'screenshot.png';
  link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  link.click();
}

function changeSelectedColor() {
    let content = textarea.value;
    let selectedText = content.slice(selectionOffsets[0], selectionOffsets[1]);
    if (selectedText.length > 0 ) {
        let value = document.getElementById("contextmenuColorPicker").value;
        content = content.slice(0, selectionOffsets[0]) + value.slice(1) + content.slice(selectionOffsets[1]);
        textarea.value = content;
    }
}

function copySelected() {
    let name = window.getSelection().toString();
    document.execCommand("copy");

    modal.className = "contextMenu--inactive";
}

function cutSelected() {
    let name = window.getSelection().toString();
    document.execCommand("copy");
    let text = textarea.value;
    text = text.slice(0, selectionOffsets[0]) + text.slice(selectionOffsets[1]);
    textarea.value = text;

    modal.className = "contextMenu--inactive";
}

function pasteSelected() {
    let content = textarea.value;
    navigator.clipboard.readText()
        .then(text => {
            content = content.slice(0, selectionOffsets[0]) + text + content.slice(selectionOffsets[1]);
            textarea.value = content;
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });

    modal.className = "contextMenu--inactive";
}

document.addEventListener('contextmenu', function(e) {
    if (modal.className == "contextMenu--inactive") {
        modal.className = "contextMenu--active";
        modal.style.left = event.clientX + "px";
        modal.style.top = event.clientY + "px";
        text = window.getSelection().toString();
        selectionOffsets = [textarea.selectionStart, textarea.selectionEnd];
        if (text[0] == "#") {
            document.getElementById("contextmenuColorPicker").value = text;
        } else {
            document.getElementById("contextmenuColorPicker").value = "#" + text;
        }
    } else {
        modal.className = "contextMenu--inactive";
    }
});
window.onclick = function(event) {
    if (event.path.indexOf(document.getElementById('contextMenu')) == -1) {
        modal.className = "contextMenu--inactive";
    }
}
window.onkeyup = function(e) {
    if ( e.keyCode === 27 ) {
        modal.className = "contextMenu--inactive";
    }
}

function updateColorValue() {
    let value = document.getElementById("toolboxColorPicker").value;
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
let droparea = document.getElementById('drag-box');
let inputfiles = document.getElementById('file-box');

// The form which will be uploaded to the server
var formData = new FormData();

// Prevent all default events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    console.log("default prevent");
    droparea.addEventListener(eventName, preventDefaults, false);
});

// Highlight the area when files are dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    droparea.addEventListener(eventName, highlightArea, false);
});

// Remove the highlight
['dragleave', 'drop'].forEach(eventName => {
    droparea.addEventListener(eventName, unhighlightArea, false);
});

// Handle the actual upload
droparea.addEventListener('drop', handleDrop, false);
inputfiles.addEventListener('change', handlePick, false);

/* Event handlers */

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlightArea(e) {
    droparea.classList.add('highlight');
}

function unhighlightArea(e) {
    droparea.classList.remove('highlight');
}

// Put files into the formdata
function handleDrop(e) {
    let dt = e.dataTransfer;
    let items = dt.items;

    if (items.length === 1) {
        let entry = items[0].webkitGetAsEntry();

        // Only allow to upload directories
        if (entry.isDirectory) {
            let projectName = entry.name;

            formData.append("project", projectName);

            let dirReader = entry.createReader();
            
            // Run recursively through the file tree.
            // Only continue when all files are available. (All promises resolved) 
            dirReader.readEntries(entries => {
                var promises = [];
                for (var i = 0; i < entries.length; i++) {
                    promises.push(traverseTree(entries[i], projectName + "/", formData));
                }
                Promise.all(promises).then(values => {
                    // Display the key/value pairs
                    for (var pair of formData.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                    }
                });
            })

        } else {
            alert("Please upload a directory.");
        }
    } else {
        alert("Please upload only one folder.");
    }

}

// Recursive function to look through directories/files
function traverseTree(item, path, form) {
    path = path || "";
    return new Promise((resolve, reject) => {
        if (item.isFile) {
            // Get the file
            item.file(file => {
                //console.log("File: ", path + file.name);
                form.append(path, file);
                resolve(true);
            })
        } else if (item.isDirectory) {
            let dirReader = item.createReader();
            dirReader.readEntries(entries => {
                var promises = [];
                for (var i = 0; i < entries.length; i++) {
                    promises.push(traverseTree(entries[i], path + item.name + "/", form));
                }
                Promise.all(promises).then(values => resolve(true));
            })
        }
    })

}

function handlePick(e) {
    handleFiles(e.target.files)
}

function handleFiles(files) {
    console.log(files)
}